/* This file has been converted to mjs so that node understands new import statements
if this code is being run in a browser, rename the files back to .js
*/
import { getAccessibleFiles, getData, getFriends } from "./queries.mjs";

async function main() {
    let res = await getData(getFriends, "0x7a65ce302c1D1F070010aDb47A59b3aF16344f97");
    console.log(res.data.data);
}

main();
