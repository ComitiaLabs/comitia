import BaseReplicate from 'replicate';
import { Replicate as BaseWrapper, ReplicateInput } from 'langchain/llms/replicate';
import { CallbackManagerForLLMRun } from 'langchain/callbacks';
import { BaseLLMParams } from 'langchain/llms/base';

/**
 * Extended to add support extending maxTokens and streaming (TODO)
 */

export class Replicate extends BaseWrapper {
  private replicate: BaseReplicate;

  constructor(args: ReplicateInput & BaseLLMParams) {
    super(args);
    this.replicate = new BaseReplicate({
      auth: this.apiKey
    });
  }

  async _call(
    prompt: string,
    options: this['ParsedCallOptions'],
    runManager?: CallbackManagerForLLMRun
  ): Promise<string> {
    const output = await this.caller.callWithOptions({ signal: options.signal }, () =>
      this.replicate.run(
        this.model,
        {
          input: {
            prompt,
            max_new_tokens: 2000,
            ...this.input
          }
        },
        ({ status, output }) => {
          if (status === 'processing') {
            runManager?.handleLLMNewToken(formatOutput(output));
          }
        }
      )
    );

    return formatOutput(output);
  }
}

const formatOutput = (output: unknown) => {
  if (typeof output === 'string') {
    return output;
  } else if (Array.isArray(output)) {
    return output.join('');
  } else {
    // Note this is a little odd, but the output format is not consistent
    // across models, so it makes some amount of sense.
    return String(output);
  }
};
