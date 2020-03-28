const puppeteer = require('puppeteer');

var arrayName = []

async function scrapeProduct(url){
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);


  // const [el] = await page.$x('//*[@id="imgBlkFront"]');
  // const src = await el.getProperty('src');
  // const imageURL = await src.jsonValue();
  //
  // const [el2] = await page.$x('//*[@id="productTitle"]');
  // const txt = await el2.getProperty('textContent');
  // const title = await txt.jsonValue();
  //
  // const [el3] = await page.$x('//*[@id="buyNewSection"]/a/h5/div/div[2]/div/span[2]');
  // const txt2 = await el3.getProperty('textContent');
  // const price = await txt2.jsonValue();
  const [name] = await page.$x('//*[@id="lblRacerName"]');
  const txt = await name.getProperty('textContent');
  const nameData = await txt.jsonValue();

  const [el] = await page.$x('//*[@id="dg"]/tbody/tr[.]');
  const txt1 = await el.getProperty('textContent');
  const lineData = await txt1.jsonValue();

  arrayName.push(lineData)
  // console.log({imageURL, title, price});
  console.log({nameData});
  console.log({lineData});
  console.log(arrayName);
  // console.log(arrayName[2]);
  console.log('helo');

  await browser.close();
}

// scrapeProduct('https://www.amazon.com/Black-Swan-Improbable-Robustness-Fragility/dp/081297381X')
scrapeProduct('https://k1austin.clubspeedtiming.com/sp_center/RacerHistory.aspx?CustID=MTAyNzMwOTc=')
