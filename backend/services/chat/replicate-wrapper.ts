import BaseReplicate from 'replicate';
import { Replicate as BaseWrapper } from 'langchain/llms/replicate';
import logger from '../../config/logger';

/**
 * Extended to add support extending maxTokens and streaming (TODO)
 */

export class Replicate extends BaseWrapper {
  async _call(prompt: string, options: this['ParsedCallOptions']): Promise<string> {
    const replicate = new BaseReplicate({
      auth: this.apiKey
    });

    if (this.promptKey === undefined) {
      const [modelString, versionString] = this.model.split(':');
      const version = await replicate.models.versions.get(
        modelString.split('/')[0],
        modelString.split('/')[1],
        versionString
      );
      const openapiSchema = version.openapi_schema;
      const inputProperties: { 'x-order': number | undefined }[] = (openapiSchema as any)
        ?.components?.schemas?.Input?.properties;
      if (inputProperties === undefined) {
        this.promptKey = 'prompt';
      } else {
        const sortedInputProperties = Object.entries(inputProperties).sort(
          ([, valueA], [, valueB]) => {
            const orderA = valueA['x-order'] || 0;
            const orderB = valueB['x-order'] || 0;
            return orderA - orderB;
          }
        );
        this.promptKey = sortedInputProperties[0][0] ?? 'prompt';
      }
    }

    const output = await this.caller.callWithOptions({ signal: options.signal }, () =>
      replicate.run(
        this.model,
        {
          input: {
            [this.promptKey!]: prompt,
            max_new_tokens: 2000,
            ...this.input
          }
        },
        (progress) => {
          logger.info('Progress', formatOutput(progress.output));
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
