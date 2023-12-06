import { z } from 'zod';

export const imageType = z.string();
export const imagesType = z.array(imageType);
export const metadataType = z.object({
  images: imagesType,
  info: z.string()
});
export const candidateType = z.object({
  name: z.string(),
  images: imagesType,
  id: z.string()
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
    options: voteType,
    metadata: metadataType,
    params: voteParamsType
  })
});
