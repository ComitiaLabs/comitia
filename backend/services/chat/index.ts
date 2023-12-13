import { ConversationChain } from 'langchain/chains';
import { BufferMemory, BufferWindowMemory } from 'langchain/memory';
import { ChatPromptTemplate, MessagesPlaceholder } from 'langchain/prompts';
import { Replicate } from './replicate-wrapper';

import { env } from '../../config/env';
import { fetchRecords, writeRecords } from '../protocols';
import { MODEL_ID, BASE_PROMPT } from '../chat/constants';
import { PatientSchema, UserInfoPromptSchema } from './schema';

const replicate = new Replicate({
  model: MODEL_ID,
  apiKey: env.REPLICATE_API_TOKEN
});

const AI_CONVERSATION_PREFIX = 'AI: ';

export class ChatSession {
  public did: string;
  public isReady: boolean = false;

  private memory: BufferMemory;
  private userInfo: PatientSchema = {};
  // TODO: Remove this once we're able to update records fetched from remote DWNs
  // instead of just adding new ones
  // Ref: https://github.com/TBD54566975/web5-js/blob/05ff2abd4fc23f411c2539b4fb635e5e6c37a8ab/packages/api/tests/record.spec.ts#L2045-L2046
  private initialMessageCount: number = 0;

  constructor(did: string) {
    this.did = did;
    this.memory = new BufferWindowMemory({
      k: 10, // K is the number of messages to remember
      returnMessages: true,
      memoryKey: 'chat_memory',
      aiPrefix: AI_CONVERSATION_PREFIX
    });
  }

  async initialize() {
    // Fetch context and user records
    await Promise.all([this.fetchUserInfo(), this.fetchChatRecords()]);

    this.isReady = true;
  }

  async cleanup() {
    await Promise.all([this.flushChatRecords()]);
  }

  async ask(question: string, onNewToken?: (token: string) => void) {
    const prompt = await this.buildSystemPrompt();
    const chain = new ConversationChain({
      memory: this.memory,
      prompt,
      llm: replicate,
      verbose: true
    });

    const { response } = await chain.call({
      input: question,
      callbacks: [
        {
          handleLLMNewToken(token: string) {
            const newToken = token.trim().replace(AI_CONVERSATION_PREFIX, '');
            newToken && onNewToken?.(newToken);
          }
        }
      ]
    });

    const trimmedResponse = String(response).trim().replace(AI_CONVERSATION_PREFIX, '');

    return trimmedResponse;
  }

  private async fetchUserInfo() {
    const userInfoRecords = (await fetchRecords(this.did, 'healthrecords')) ?? [];

    // In practice there should only be one record
    const userInfo = userInfoRecords.at(-1);

    this.userInfo = (await userInfo?.data.json()) ?? {};
  }

  private async fetchChatRecords() {
    const records = (await fetchRecords(this.did, 'messagerecords')) ?? [];
    const recordData = (await Promise.all(records.map((record) => record.data.json()))).flat() as {
      type: 'human' | 'ai';
      content: string;
    }[];
    this.initialMessageCount = recordData.length;

    // For each human message, group it with the next AI message
    // if there is one
    const messages = recordData.reduce(
      (acc, record, index) => {
        if (record.type === 'human') {
          acc.push({
            human: record.content,
            ai: recordData[index + 1]?.content ?? ''
          });
        }

        return acc;
      },
      [] as {
        human: string;
        ai: string;
      }[]
    );

    // Happens in serial but should be fine,
    // this op is not expensive
    for await (const message of messages) {
      await this.memory.saveContext(
        { input: message.human },
        { [AI_CONVERSATION_PREFIX]: message.ai }
      );
    }
  }

  private async flushChatRecords() {
    const messages = await this.memory.chatHistory.getMessages();
    const messagesToWrite = messages.slice(this.initialMessageCount);

    const serializableMessages = messagesToWrite.map((message) => ({
      type: message._getType().toString(),
      content: message.content.toString().replace(AI_CONVERSATION_PREFIX, '')
    }));

    if (messagesToWrite.length < 1) return;

    await writeRecords(this.did, {
      schema: 'messagerecords',
      data: serializableMessages
    });
  }

  private generateUserInfoString(obj: UserInfoPromptSchema): string {
    let result = '';

    if (obj.name !== undefined) {
      result += `name: ${obj.name}\n`;
    }
    if (obj.birthdate !== undefined) {
      result += `age: ${obj.birthdate}\n`;
    }
    if (obj.language !== undefined) {
      result += `language: ${obj.language}\n`;
    }
    if (obj.gender !== undefined) {
      result += `gender: ${obj.gender}\n`;
    }

    return result.trim();
  }

  private async buildSystemPrompt() {
    // TODO: Update this to use EntityMemory
    // const userInfoObj: UserInfoPromptSchema = {
    //   name: this.userInfo.patient?.name?.join(' '),
    //   birthdate: this.userInfo.patient?._birthDate,
    //   language: this.userInfo.patient?.language,
    //   gender: this.userInfo.patient?.gender
    // };

    const prompt = ChatPromptTemplate.fromMessages([
      ['system', BASE_PROMPT],
      new MessagesPlaceholder('chat_memory'),
      ['human', '{input}']
    ]);

    console.log(prompt.promptMessages);
    return prompt;
  }
}
