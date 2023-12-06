import { z } from 'zod';
import { electionCreateSchema } from '../schemas/election';

export type ElectionCreateSchema = z.infer<typeof electionCreateSchema>['body'];
export const createConfig = (config: ElectionCreateSchema) => {
  // TODO: add future manipulation of config here
  const base = config;

  return base satisfies ElectionCreateSchema;
};
