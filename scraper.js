const puppeteer = require('puppeteer');
var firebase = require("firebase/app");

var arrayName = []

async function scrapeProduct(url){
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.goto(url);

  // await page.waitForSelector('.clients-table > tbody > tr > td');
  // console.log((await page.$$('.clients-table > tbody > tr > td')).length);

  const raceCounts = await page.$$eval('tr.Normal', trs => trs.length);
  console.log(raceCounts)
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
  console.log({nameData});


  var i;
  for (i = 1; i < raceCounts+2; i++) {
    var arrayName = []
    console.log(i);

    const [el0] = await page.$x('//*[@id="dg"]/tbody/tr['+i+']/td[1]');
    const txt0 = await el0.getProperty('textContent');
    const heatTypeAndKart = await txt0.jsonValue();
    let heatData = heatTypeAndKart.split(' - Kart ')
    const heatType = heatData[0]
    const kartNumberLong = heatData[1]
    if (kartNumberLong < 10) {
      var kartNumber = "0".concat(kartNumberLong)
    } else {
      var kartNumber = kartNumberLong
    }




    const [el1] = await page.$x('//*[@id="dg"]/tbody/tr['+i+']/td[2]');
    const txt1 = await el1.getProperty('textContent');
    const dateTimeLong = await txt1.jsonValue();
    const dateTimeShort = dateTimeLong.trim();
    const dateTimeSplit = dateTimeShort.split(" ")
    const date = dateTimeSplit[0]
    const time = dateTimeSplit.splice(1,2).toString().replace(",", " ")


    const [el2] = await page.$x('//*[@id="dg"]/tbody/tr['+i+']/td[3]');
    const txt2 = await el2.getProperty('textContent');
    const k1rs = await txt2.jsonValue();

    const [el3] = await page.$x('//*[@id="dg"]/tbody/tr['+i+']/td[4]');
    const txt3 = await el3.getProperty('textContent');
    const bestTime = await txt3.jsonValue();

    const [el4] = await page.$x('//*[@id="dg"]/tbody/tr['+i+']/td[5]');
    const txt4 = await el4.getProperty('textContent');
    const positionLong = await txt4.jsonValue();
    const position = positionLong.trim();



    // arrayName.push(heatType1, dateTime, k1rs, bestTime, position)
    var raceData = {heatType, kartNumber, date, time, k1rs, bestTime, position}
    // console.log(arrayName);
    console.log(typeof raceData);
    console.log(raceData);



    // console.log({lineData});
  }



  // const [el] = await page.$x('//*[@id="dg"]/tbody/tr[136]');
  // const txt1 = await el.getProperty('textContent');
  // const lineData = await txt1.jsonValue();

  // arrayName.push(lineData)
  // // console.log({imageURL, title, price});
  // console.log({nameData});
  // console.log({lineData});
  // console.log("hello", arrayName);
  // console.log(arrayName[0]);


  await browser.close();
}

// scrapeProduct('https://www.amazon.com/Black-Swan-Improbable-Robustness-Fragility/dp/081297381X')
scrapeProduct('https://k1austin.clubspeedtiming.com/sp_center/RacerHistory.aspx?CustID=MTAyNzMwOTc=')
