import { } from 'dotenv/config'
import ck from "ckey"; //dotenv plugin that recursively checks directories for a .env
import puppeteer from "puppeteer"
import os from "os"

async function login() {
  const userName = ck.INSTANCE_USER_NAME;
  const password = ck.INSTANCE_PASSWORD;
  const instanceName = ck.INSTANCE_NAME;

  if (!userName || !password || !instanceName) {
    console.log("Please ensure you configure your instance settings as a .env file")
    return false;
  }

  const browserConfig = {
    headless: true
  }
  //raspberry pi and other arm based systems need their path explicitly defined.
  if (os.arch() === "arm") {
    browserConfig[executablePath] = "/usr/bin/chromium"
  }

  const browser = await puppeteer.launch(browserConfig);
  const page = await browser.newPage()
  const navigationPromise = page.waitForNavigation()

  //set browser to desktop version so app nav is available
  //https://github.com/puppeteer/puppeteer/issues/1766
  await page.setUserAgent('Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/61.0.3163.100 Safari/537.36');

  console.log(`Attempting to log ${userName} into ${instanceName}.service-now.com`);
  await page.setCacheEnabled(false);
  await page.goto(`https://${instanceName}.service-now.com/login.do`)


  await page.setViewport({ width: 1605, height: 373 })

  await page.waitForSelector('#user_name')
  await page.click('#user_name')
  await page.type('#user_name', userName)

  await page.waitForSelector('#user_password')
  await page.click('#user_password')
  await page.type('#user_password', password)

  await page.waitForSelector('#sysverb_login')
  await page.click('#sysverb_login')

  await navigationPromise

  try {
    //If browser navigates then form was submitted correctly.
    await page.waitForNavigation()
    console.log("Login Succesful")
  } catch (e) {
    console.log(e);
    console.log("Login Failed");
  }
  await browser.close();
}

login();
