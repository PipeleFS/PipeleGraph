/* This file has been converted to mjs so that node understands new import statements
if this code is being run in a browser, rename the files back to .js
*/
import axios from "axios";

let URL = "https://api.thegraph.com/subgraphs/name/darahask/pipe";

export const getFriends = (addr) => `{
  pipeleShares(
    where: {from_contains_nocase: "${addr}", to_not_contains_nocase: "${addr}"}
  ) {
    id
    to
  }
  }`;

export const getAccessibleFiles = (addr) => `{
  pipeleShares(
    where: {to_contains_nocase: "${addr}"}
  ) {
    from
    pipeleSBT {
      fileID
      id
    }
  }
  }`;

export async function getData(func, val) {
  let query = func(val);
  return await axios.post(URL, { query });
}

/* uncomment to test */

// getData(
//   getSharedofOwnerQuery,
//   "0xdd372842cb80c1892243d20ee4ad0979c293cad5"
// ).catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });

// getData(
//   getIdofFileQuery,
//   "bafybeibhirdk3junquvmanfrfknedqqx5uwkdbmuo24fssxpuviicjpm4u"
// ).catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });

// getData(
//   getAccessibleFiles,
//   "0xdd372842cb80c1892243d20ee4ad0979c293cad5"
// ).then((res) => {
//   console.log(res.data.data);
// }).catch((error) => {
//   console.error(error);
//   process.exitCode = 1;
// });
