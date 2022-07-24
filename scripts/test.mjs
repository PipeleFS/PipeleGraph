/* This file has been converted to mjs so that node understands new import statements
if this code is being run in a browser, rename the files back to .js
*/
import { getAccessibleFiles, getData, getFriends } from "./queries.mjs";

async function main() {
    let res = await getData(getAccessibleFiles, "0x364b5966a7c788658fba7c604b5c42eb637a381e");
    console.log(res.data.data);
}

main();