const puppeteer = require('puppeteer');
// const url = "https://musescore.com/user/168725/scores/1587526"; // png
// const url = "https://musescore.com/user/12461571/scores/3291706"; // png
// const url = "https://musescore.com/user/17081446/scores/5256444"; //svg
// all scores saved after May 2017 = svg

async function run() {
  return new Promise(async(resolve, reject)=> {
    try{
      //setup stuff
      const browser = await puppeteer.launch({headless: false});
      const webpage = await browser.newPage();
      await webpage.setViewport({
        width: 1920,
        height: 1080,
      });
      await webpage.goto(url);

      await webpage.waitForSelector('.image');
      var sheetsData = await webpage.evaluate(async () => {
        var musicData = [];
        const image = document.querySelector('.image > img');
        const url = image.getAttribute('src');
        const numPages = document.querySelectorAll('.page').length;
        
        var scriptsData = Array.from(document.querySelectorAll("script")).filter(x=>x.getAttribute('type')=='application/ld+json');
        var scriptsInfo  = JSON.parse(scriptsData[0].text);
        
        musicData.push({"page" : url});
        var data = { 
          "title": scriptsInfo.name,
          "datePublished": scriptsInfo.datePublished,
          "numberOfPages": numPages,
          "url":url
        };

        return data;
      })
      await browser.close();
      return resolve(sheetsData);
    }
    catch(e) {
      return reject(e);
    }
  })
}

run().then(data => {
  console.log(data);
  const links = createLinksArray(data);
  console.log(links);
}).catch(console.error);

function createLinksArray(data) {
  let links = [];
  const link = data.url;
  links.push(link);

  let imageType = "png";
  if(new Date(data.datePublished) >= new Date(2017,3))
    imageType = "svg";

  for(var i=1;i<data.numberOfPages;i++){
    const poop = link.replace(`0.${imageType}`, `${i}.${imageType}`);
    links.push(poop);
  }
  return links;
}

function compareDates(){
  console.log(new Date())
}