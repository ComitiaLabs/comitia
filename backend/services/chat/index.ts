import { ConversationChain } from 'langchain/chains';
import { BufferMemory } from 'langchain/memory';
import { ChatPromptTemplate, MessagesPlaceholder } from 'langchain/prompts';
import { Replicate } from './replicate-wrapper';

import { env } from '../../config/env';
import { fetchRecords, writeRecords } from '../protocols';
import { MODEL_ID, BASE_PROMPT } from '../chat/constants';

const replicate = new Replicate({
  model: MODEL_ID,
  apiKey: env.REPLICATE_API_TOKEN
});

const AI_CONVERSATION_PREFIX = 'AI: ';

export class ChatSession {
  public did: string;
  public isReady: boolean = false;

  private memory: BufferMemory;
  private context: string = '';
  private userInfo: Record<string, unknown> = {};

  constructor(did: string) {
    this.did = did;
    this.memory = new BufferMemory({
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

  async ask(question: string) {
    const prompt = await this.buildSystemPrompt();
    const chain = new ConversationChain({
      memory: this.memory,
      prompt,
      llm: replicate,
      verbose: true
    });

    const { response } = await chain.call({
      input: question
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
    const serializableMessages = messages.map((message) => ({
      type: message._getType().toString(),
      content: message.content.toString().replace(AI_CONVERSATION_PREFIX, '')
    }));

    await writeRecords(this.did, {
      schema: 'messagerecords',
      data: serializableMessages
    });
  }

  private async buildSystemPrompt() {
    // Builds system prompt from context and user info
    // TODO: Enrich this with user info
    const prompt = ChatPromptTemplate.fromMessages([
      ['system', BASE_PROMPT],
      new MessagesPlaceholder('chat_memory'),
      ['human', '{input}']
    ]);

    return prompt;
  }
}
