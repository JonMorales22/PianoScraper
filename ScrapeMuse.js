const puppeteer = require('puppeteer');
const url = "https://musescore.com/user/168725/scores/1587526";

async function run() {
  const browser = await puppeteer.launch({headless: false});
  const webpage = await browser.newPage();
  await webpage.setViewport({
    width: 1920,
    height: 1080,
    // deviceScaleFactor: 1,
  });
  await webpage.goto(url);
  webpage.waitForNavigation();
  // webpage.waitForSelector(`.image`);
  var sheetsData = await webpage.evaluate(() => {
    var poop = [];
    var data = document.querySelector(`.page_0`);
    var pageNumber = data.dataset.page;
    var url = document.querySelector('.image > img').getAttribute('src');
    poop.push({[pageNumber] : [url]});
    poop.push(url);
    return poop;
  })

  console.log(sheetsData);
  await browser.close();
}

run();

/*
[
    {page_0: "www.poop.com"},
    {page_1: "www.poop.com"},
]

*/