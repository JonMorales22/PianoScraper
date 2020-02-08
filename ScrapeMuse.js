const puppeteer = require('puppeteer');
const url = "https://musescore.com/user/168725/scores/1587526";

async function run() {
  const browser = await puppeteer.launch({headless: false});
  const webpage = await browser.newPage();
  await webpage.setViewport({
    width: 1920,
    height: 1080,
  });
  await webpage.goto(url);
  webpage.waitForNavigation();
  var sheetsData = await webpage.evaluate(async () => {
    var musicData = [];
    const screenHeight = document.querySelector('.viewerInner').style.height;
    const image = document.querySelector('.image > img');
    const url = image.getAttribute('src');
    const pageNumber = image.parentElement.parentElement.dataset.page;
    const numPages = document.querySelectorAll('.page').length;
    musicData.push({[pageNumber] : url});
    var data = {"height":[screenHeight],"numberOfPages":[numPages],"sheetMusic":[musicData]}
    return data;
  })




  console.log(sheetsData);
  await webpage.close();
  browser.close();
}

run();

/*
[
    {0: "www.poop.com"},
    {1: "www.poop.com"},
]

*/