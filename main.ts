const playwright = require("playwright");
const API_KEY = "e7437ecc-a3fc-498f-a4ae-8c9c451e9780";

class App {
  appId?: number;
  appType?: string;
  developer?: [string, string];
  publisher?: [string, string];
  supportedSystems?: Array<String>;
  technologies?: [string, string];
  lastChangeNumber?: [string, number];
  lastRecordUpdate?: string;
  releaseDate?: string;

  constructor(
    appId?: number,
    appType?: string,
    developer?: [string, string],
    publisher?: [string, string],
    supportedSystems?: Array<String>,
    technologies?: [string, string],
    lastChangeNumber?: [string, number],
    lastRecordUpdate?: string,
    releaseDate?: string
  ) {
      this.appId = appId;
      this.appType = appType;
      this.developer = developer;
      this.publisher = publisher;
      this.supportedSystems = supportedSystems;
      this.technologies = technologies;
      this.lastChangeNumber = lastChangeNumber;
      this.lastRecordUpdate = lastRecordUpdate;
      this.releaseDate = releaseDate
  }

}


function getScrapeOpsUrl(url: string) {
    let payload = {
        "api_key": API_KEY,
        "url": url
    };
    const queryString = new URLSearchParams(payload).toString();
    const proxy_url = `https://proxy.scrapeops.io/v1/?${queryString}`;
    return proxy_url
}

async function main() {
    const browser = await playwright.chromium.launch({
        headless: true,
    });
    
    const page = await browser.newPage();
    await page.goto(getScrapeOpsUrl("https://steamdb.info/app/730/charts/"));
    await page.waitForTimeout(4000);

     const data = await page.evaluate(() => {
      
      const appIdData = document.querySelector('#main > div > div.header-wrapper > div > div.row.app-row > div.span8 > table > tbody > tr:nth-child(1) > td:nth-child(2)') as HTMLInputElement | null;
      const appTypeData = document.querySelector('#main > div > div.header-wrapper > div > div.row.app-row > div.span8 > table > tbody > tr:nth-child(2) > td:nth-child(2)') as HTMLInputElement | null;
      const developerData = document.querySelector('#main > div > div.header-wrapper > div > div.row.app-row > div.span8 > table > tbody > tr:nth-child(3) > td:nth-child(2) > a') as HTMLInputElement | null;
      const publisherData = document.querySelector('#main > div > div.header-wrapper > div > div.row.app-row > div.span8 > table > tbody > tr:nth-child(4) > td:nth-child(2) > a') as HTMLInputElement | null;
      const supportedSystemsData = document.querySelector('#main > div > div.header-wrapper > div > div.row.app-row > div.span8 > table > tbody > tr:nth-child(5) > td.os-icons') as HTMLInputElement | null;
      const technologiesData = document.querySelector('#main > div > div.header-wrapper > div > div.row.app-row > div.span8 > table > tbody > tr:nth-child(6) > td:nth-child(2) > a') as HTMLInputElement | null;
      const lastChangeNumberData = document.querySelector('#main > div > div.header-wrapper > div > div.row.app-row > div.span8 > table > tbody > tr:nth-child(7) > td:nth-child(2) > a') as HTMLInputElement | null;
      const lastRecordUpdateData = document.querySelector('#main > div > div.header-wrapper > div > div.row.app-row > div.span8 > table > tbody > tr:nth-child(8) > td:nth-child(2)') as HTMLInputElement | null;
      const releaseDateData = document.querySelector('#main > div > div.header-wrapper > div > div.row.app-row > div.span8 > table > tbody > tr:nth-child(9) > td:nth-child(2)') as HTMLInputElement | null;

      return {
        appId: Number(appIdData?.innerText ?? '0'),
        appType: appTypeData?.innerText ?? 'Unknown',
        developer: [developerData?.getAttribute('href') ?? '', developerData?.getAttribute('content') ?? ''],
        publisher: [publisherData?.getAttribute('href') ?? '', publisherData?.getAttribute('content') ?? ''],
        supportedSystems: supportedSystemsData?.innerText.trim().split(' ') ?? [],
        technologies: [technologiesData?.getAttribute('href') ?? '', technologiesData?.innerText ?? ''],
        lastChangeNumber: [lastChangeNumberData?.getAttribute('href') ?? '', Number(lastChangeNumberData?.innerText ?? '0')],
        lastRecordUpdate: lastRecordUpdateData?.innerText ?? 'Unknown',
        releaseDate: releaseDateData?.innerText ?? 'Unknown'
    };
  });

  const app = new App(
    data.appId,
    data.appType,
    data.developer,
    data.publisher,
    data.supportedSystems,
    data.technologies,
    data.lastChangeNumber,
    data.lastRecordUpdate,
    data.releaseDate
  );

  const jsonApp = JSON.stringify(app);

  console.log(jsonApp)

  await browser.close();
}

main();
