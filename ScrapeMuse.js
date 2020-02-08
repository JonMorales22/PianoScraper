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
    const image = document.querySelector('.image > img');
    const url = image.getAttribute('src');
    const numPages = document.querySelectorAll('.page').length;
    musicData.push({"page" : url});
    var data = {"numberOfPages": [numPages] ,"sheetMusic":musicData}
    return data;
  })

  const linksArr = createLinksArray(sheetsData)
 
  console.log(linksArr);
  await webpage.close();
  browser.close();
}

run();

function createLinksArray(arr) {
  var links = [];
  const shit = arr.sheetMusic[0].page;
  //console.log(shit);

  const shit2 = arr.sheetMusic[0].page;
  const poop = shit2.replace('0.png', '1.png');
  //console.log("poop: " + poop);
  
  
  links.push(shit2);
  links.push(poop);
  return links;
}