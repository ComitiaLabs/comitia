import { ConversationChain } from 'langchain/chains';
import { BufferMemory } from 'langchain/memory';
import { ChatPromptTemplate, MessagesPlaceholder } from 'langchain/prompts';
import { Replicate } from './replicate-wrapper';

import { env } from '../../config/env';
import { fetchRecords } from '../protocols';
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
    await Promise.all([this.fetchUserInfo(), this.fetchContext()]);

    this.isReady = true;
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
    const userInfoRecords = (await fetchRecords(this.did, 'health_records')) ?? [];

    // In practice there should only be one record
    const userInfo = userInfoRecords.at(-1);

    this.userInfo = (await userInfo?.data.json()) ?? {};
  }

  private async fetchContext() {
    const context = (await fetchRecords(this.did, 'context')) ?? [];

    this.context = (await Promise.all(context.map((record) => record.data.text()))).join('\n');
  }

  private async buildSystemPrompt() {
    // Builds system prompt from context and user info
    // TODO: Enrich this with context and user info
    const prompt = ChatPromptTemplate.fromMessages([
      ['system', BASE_PROMPT],
      new MessagesPlaceholder('chat_memory'),
      ['human', '{input}']
    ]);

    return prompt;
  }
}
