export type Fn<Arg, Result> = (...arg: Arg[]) => Result;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type AsyncFn<Arg = any, Result = any> = (params: Arg) => Promise<Result>;
