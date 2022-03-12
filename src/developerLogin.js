import { chromium } from 'playwright';
import ck from "ckey"; //dotenv plugin that recursively checks directories for a .env

async function login() {

  const browser = await chromium.launch({ headless: false, slowMo: 100 })
  const page = await browser.newPage()
  const navigationPromise = page.waitForNavigation()

  await page.goto('https://developer.servicenow.com/dev.do')

  await page.setViewportSize({ width: 1657, height: 968 })

  await page.waitForSelector('dps-login')
  await page.click('dps-login')

  await navigationPromise

  await navigationPromise

  await page.waitForSelector('#sign_in_username')
  await page.click('#sign_in_username')
  await page.fill('#sign_in_username', ck.DEVELOPER_USER_NAME)

  await page.click('#sign_in_username_btn')

  await page.waitForSelector('#sign_in_password')
  await page.click('#sign_in_password')
  await page.fill('#sign_in_password', ck.DEVELOPER_PASSWORD)

  await page.waitForSelector('#sign_in_password_btn')
  await page.click('#sign_in_password_btn')

  await navigationPromise

  await page.waitForLoadState('networkidle');
  const success = await page.isVisible("dps-home-auth-quebec")
  success ? console.log("Yay") : console.log("Nay")
  await page.screenshot({ path: 'screenshot.png', fullPage: true });

  await browser.close()

}

login();