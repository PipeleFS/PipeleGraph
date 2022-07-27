/* This file has been converted to mjs so that node understands new import statements
if this code is being run in a browser, rename the files back to .js
*/
import { getAccessibleFiles, getData, getFriends } from "./queries.mjs";

async function main() {
    let res = await getData(getAccessibleFiles, "0xdd372842cb80c1892243d20ee4ad0979c293cad5");
    console.log(JSON.stringify(res, null, 2));
}

main();