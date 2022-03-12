#!/usr/bin/env zx
import 'zx/globals'

const refresherScriptPath = await path.resolve("index.js");
const devRefresher = await path.resolve("developerLogin.js");

//have to trim standard output otherwise /n will be appended to nodePath
createCron(refresherScriptPath, "0 */12 * * *");
createCron(devRefresher, "0 */6 * * *");

await $`crontab -l`

async function createCron (script, schedule) {
  const nodePath = await $`which node`;
  const cronCmd = nodePath.toString().trim() + " " + script;
  const cronJob = `${schedule} ${cronCmd}`; //run command every 12 hours
//add it to crontab, with no duplication
  await $`( crontab -l | grep -v -F ${cronCmd} ; echo ${cronJob} ) | crontab -`;
}
