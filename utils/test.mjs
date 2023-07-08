import getData from '../coverage/googleSheet.mjs/index.js';

export default async function getForm () {
  const resp = await getData('10zc_emnqq3l7VvHrWXUvxnU9mRAiK90PX7zSfqKlozY', 1806269592);
  console.log(resp);
};