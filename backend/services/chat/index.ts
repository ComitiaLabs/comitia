import Replicate, { type Prediction } from 'replicate';

import { env } from '../../config/env';
import { fetchRecords } from '../protocols';
import { MODEL_ID, BASE_PROMPT } from '../chat/constants';

const replicate = new Replicate({
  auth: env.REPLICATE_API_TOKEN
});

export class ChatSession {
  public did: string;
  public isReady: boolean = false;

  private context: string = '';
  private userInfo: PatientSchema = {};

  constructor(did: string) {
    this.did = did;
  }

  async initialize() {
    // Fetch context and user records
    await Promise.all([this.fetchUserInfo(), this.fetchContext()]);

    this.isReady = true;
  }

  async ask(question: string, onNewResponse: (response: Prediction) => void) {
    const response = await replicate.run(
      MODEL_ID,
      {
        input: {
          prompt: question,
          systemPrompt: this.buildSystemPrompt()
        }
      },
      (res) => {
        if (['succeeded'].includes(res.status)) {
          onNewResponse(res.output.join(''));
        }
      }
    );

    if ((response as Prediction).status === 'failed') {
      console.error('Failed to get response from model', response);
      throw new Error('Failed to get response from model');
    }

    return response;
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
    // TODO: Enrich this with context and user info
    return BASE_PROMPT + "\n" + "Gender: " + this.userInfo.patient?.gender + "\n" + "Name: "+ this.userInfo.patient?.name + "\n" + "Language: "+ this.userInfo.patient?.language + "\n" + "BirthDate: "+ this.userInfo.patient?.birthDate;
  }
}
