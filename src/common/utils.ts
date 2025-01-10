import numeral from "numeral";

export function formatNumber(n?: number): string {
  return n ? numeral(n).format("0,0.[00]") : "0";
}

export async function sleep(milisecond: number): Promise<void> {
  await new Promise((resolve) => setTimeout(resolve, milisecond));
}
