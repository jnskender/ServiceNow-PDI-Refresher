import readline from 'readline-promise';
import fs from 'fs';
import path from "path";

const rlp = readline.default.createInterface({
  terminal: true,
  input: process.stdin,
  output: process.stdout
})

const instance = await rlp.questionAsync("What is your instances subdomain? Ex: dev89234: ");
const username = await rlp.questionAsync("Username to login with: ");
const password = await rlp.questionAsync("Password to login with: ");

rlp.close();

const template = `
#INSTANCE_NAME is the subdomain of your ServiceNow Instance.
#Ex: https://dev59999.service-now.com
#Would be: INSTANCE_NAME=dev59999
INSTANCE_NAME=${instance}

#The user_name of a sys_user account on your ServiceNow Instance.
INSTANCE_USER_NAME=${username}

#The password of a sys_user account on your ServiceNow Instance.
INSTANCE_PASSWORD=${password}
`;

await fs.promises.writeFile("../.env", template)

console.log(instance, username, password)