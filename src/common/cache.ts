type Fn<ArgumentType, ReturnType> = (arg: ArgumentType) => ReturnType;

export function cache<Arg, Ret>(fn: Fn<Arg, Ret>, duration: number): Fn<Arg, Ret> {
  const cacheStore = new Map<Arg, { timestamp: number; result: Ret }>();
  return (arg: Arg): Ret => {
    const now = Date.now();
    const cached = cacheStore.get(arg);
    if (cached !== undefined && now - cached.timestamp < duration) {
      return cached.result;
    }

    const result = fn(arg);
    cacheStore.set(arg, { timestamp: now, result });
    return result;
  };
}
