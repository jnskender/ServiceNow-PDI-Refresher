import dotenv from 'dotenv'
import  path, { dirname } from 'path';
import puppeteer from "puppeteer"

(async () => {

  //__dirname not available when using es_modules
  const __dirname = dirname(path.resolve("./"));

  //tell dotenv it can find our .env file in the root directory. Otherwise it looks for it in src.
  dotenv.config({path: path.resolve(__dirname, './.env')})

  const userName = process.env.INSTANCE_USER_NAME;
  const password = process.env.INSTANCE_PASSWORD;
  const instanceName = process.env.INSTANCE_NAME;

  if(!userName || !password || !instanceName){
    console.log("Please ensure you configure your instance settings as a .env file")
    return false;
  }

  const browser = await puppeteer.launch({ headless: false, slowMo: 50 })
  //const browser = await puppeteer.launch()
  const page = await browser.newPage()
  const navigationPromise = page.waitForNavigation()

  await page.goto('https://dev77653.service-now.com/welcome.do')

  await page.setViewport({ width: 1605, height: 373 })

  await page.waitForSelector('#user_name')
  await page.click('#user_name')
  await page.type('#user_name', 'jnskender')

  await page.waitForSelector('#user_password')
  await page.click('#user_password')
  await page.type('#user_password', 'Smuttynose0433')

  await page.waitForSelector('#sysverb_login')
  await page.click('#sysverb_login')

  await navigationPromise

  try {
    //see if login was succesfull by checking for the app nav filter.
    await page.waitForSelector('#filter');
    console.log("App Navigator was found! Login Succesful")
  } catch (e) {
    if (e instanceof puppeteer.errors.TimeoutError) {
      console.log(e);
      console.log("Login appears to be unsuccesful.");
    }
  }

  await browser.close();
})();