import Replicate, { type Prediction } from 'replicate';

import { env } from '../config/env';
import { fetchRecords } from './protocols';
import { MODEL_ID } from './chat/constants';

const replicate = new Replicate({
  auth: env.REPLICATE_API_TOKEN
});

export class ChatSession {
  public did: string;

  private context: string = '';
  private userInfo: Record<string, unknown> = {};

  constructor(did: string) {
    this.did = did;
  }

  async initialize() {
    // Fetch context and user records
    await Promise.all([this.fetchUserInfo(), this.fetchContext()]);
  }

  async ask(question: string, onNewResponse: (response: Prediction) => void) {
    return await replicate.run(
      MODEL_ID,
      {
        input: {
          prompt: question,
          systemPrompt: this.buildSystemPrompt()
        }
      },
      onNewResponse
    );
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

  private buildSystemPrompt() {
    // Builds system prompt from context and user info
  }
}
