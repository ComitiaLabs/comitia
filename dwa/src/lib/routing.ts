import { AppPath } from '@/router';

type Prettify<T> = { [K in keyof T]: T[K] };

type Params<T> = T extends `${string}:${infer Param}/${infer Rest}`
  ? Prettify<{ [X in Param]: string } & Params<Rest>>
  : T extends `${string}:${infer Param}`
  ? Prettify<{ [X in Param]: string }>
  : Record<never, string>;

/**
 * Typesafe path generator
 */
export const validPath = <T extends AppPath>(path: T, opts: Params<T>) => {
  let result: string = path;

  Object.keys(opts).forEach(key => {
    result = result.replace(`:${key}`, `${opts[key as keyof typeof opts]}`);
  });

  return result;
};
