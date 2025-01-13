import * as yup from 'yup';

/**
 * Calculate total amount of a transaction from a note
 */
export function getTransAmounts(line: string): number {
  const isIncome = /nhận/.exec(line);
  const matches = line.match(/(\d+)[kK]/g);
  if (matches === null) return 0;

  const amt = matches.reduce<number>((total, match) => {
    const val = Number.parseFloat(match.replace(/k/i, ''));
    return Number.isNaN(val) ? total : total + val;
  }, 0);
  return isIncome ? amt : -amt;
}

/**
 * Calculate income and outcome from transaction amount in a note
 * each line in the note will be a transaction
 *
 * @returns {[number, number]} income and outcome
 */
export function getTotalAmounts(note: string): [number, number] {
  let income = 0;
  let outcome = 0;
  for (const trans of note.split('\n')) {
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
  content: yup.string().required('This field is required'),
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
