const puppeteer = require('puppeteer');

import { IMusicScraper } from './IMusicScraper';

const NEW_API_DATE =  new Date(2017,2);
let imageType;


export class MuseScraper implements IMusicScraper {
    url: string
    constructor(url: string) {
        this.url = url;
    }
    async ScrapeWebsite() : Promise<any> {
        return new Promise(async (resolve, reject) => {
            try{
                let data = await this.Run();
                const links = this.CreateLinksArray(data);
                data.links = links;
                data.type = imageType;
                return resolve(data);
            }
            catch(e) {
                return reject(e);
            }
        });
    }

    async Run() : Promise<any> {
        return new Promise(async(resolve, reject)=> {
            try{
              //setup stuff
              const browser = await puppeteer.launch();
              const webpage = await browser.newPage();
              await webpage.setViewport({
                width: 1920,
                height: 1080,
              });
              await webpage.goto(this.url);
        
              await webpage.waitForSelector('img');
              let stuff;
              webpage.evaluate(() => {
                var musicData = [];
                const image = document.querySelector('img');
                const url = image.getAttribute('src');
                const numPages = document.querySelectorAll('.gXB83').length;

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
              }).then((result)=>{
                stuff = result;
              }).then(() => {
                browser.close();
                return resolve(stuff);
              })
              .catch(console.error);
            }
            catch(e) {
              return reject(e);
            }
          })  
    }

    CreateLinksArray(data : any) : string[] {
        let links = [];
        imageType = this.getImageType(data.datePublished, data.url);
        
        for(var i=0;i<data.numberOfPages;i++){
          const poop = data.url.replace(`_0.${imageType}`, `_${i}.${imageType}`);
          links.push(poop);
        }
        return links;
    }

    getImageType(datePublished: Date, url: string) : string {
        if((new Date(datePublished) >= NEW_API_DATE) 
            || url.includes("score_0.svg")
        )
          return "svg";

        return "png";
    }
}