import { z } from 'zod';

export const metadataType = z.object({
  images: z.array(z.string()),
  info: z.string()
});
export const candidateType = z.object({
  name: z.string(),
  image: z.string()
});
export const voteType = z.object({
  name: z.string(),
  description: z.string(),
  candidates: z.array(candidateType),
  metadata: metadataType
});
export const voteParamsType = z.object({
  vcCompare: z.string()
});

export const electionCreateSchema = z.object({
  body: z.object({
    electionOptions: voteType,
    metadata: metadataType,
    params: voteParamsType
  })
});
