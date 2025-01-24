export type Fn<Arg, Result> = (arg: Arg) => Result;

export type AsyncFn<Arg, Result> = (params: Arg) => Promise<Result>;
