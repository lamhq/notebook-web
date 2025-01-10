// biome-ignore lint/style/noNamespaceImport: avoid duplicated with primitive types
import * as yup from "yup";

/**
 * Calculate total amount of a transaction
 * a transaction is an imcome if it has the word "nhận"
 *
 * @param {string} content transaction note
 * @returns {number} total amount, negative if it is an outcome
 */
function getTransAmounts(transContent: string): number {
  const isIncome = transContent.match("nhận");
  const regex = /(\d+)k/g;
  let amt = 0;
  let match: RegExpExecArray | null = null;
  do {
    match = regex.exec(transContent);
    if (!match) {
      break;
    }
    const val = Number.parseFloat(match[1]);
    amt += Number.isNaN(val) ? 0 : val;
  } while (match);
  return isIncome ? amt : -amt;
}

/**
 * Calculate income and outcome from transaction amount in a note
 * each line in the note will be a transaction
 *
 * @param {string} content transaction note
 * @returns {[number, number]} an array of income and outcome
 */
export function getTotalAmounts(content: string): [number, number] {
  let income = 0;
  let outcome = 0;
  for (const trans of content.split("\n")) {
    const amt = getTransAmounts(trans);
    if (amt > 0) {
      income += amt;
    } else {
      outcome += -amt;
    }
  }
  return [income, outcome];
}

export const yupSchema = yup.object().shape({
  time: yup.date().required(),
  content: yup.string().required("This field is required"),
  tags: yup.array(yup.string().required()).required(),
  income: yup.number(),
  outcome: yup.number(),
  // income: yup.lazy((value) =>
  //   value === ''
  //     ? yup.string()
  //     : yup.number().positive().integer('This field must be integer'),
  // ),
  // outcome: yup.lazy((value) =>
  //   value === ''
  //     ? yup.string()
  //     : yup.number().positive().integer('This field must be integer'),
  // ),
});
