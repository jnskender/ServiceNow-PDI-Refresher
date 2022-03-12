#!/usr/bin/env zx
import 'zx/globals'

const nodePath = await $`which node`
let refresherScriptPath = await path.resolve("index.js");
await $`echo ${nodePath}`

//have to trim standard output otherwise /n will be appended to nodePath
const cronCmd = nodePath.toString().trim() + " " + refresherScriptPath;
const cronJob = `0 */12 * * * ${cronCmd}`; //run command every 12 hours
//add it to crontab, with no duplication
await $`( crontab -l | grep -v -F ${cronCmd} ; echo ${cronJob} ) | crontab -`;
