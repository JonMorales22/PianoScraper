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
              const browser = await puppeteer.launch({headless: false});
              const webpage = await browser.newPage();
              await webpage.setViewport({
                width: 1920,
                height: 1080,
              });
              await webpage.goto(this.url);
        
              await webpage.waitForSelector('.image');
              let stuff;
              webpage.evaluate(() => {
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
              }).then((result)=>{
                stuff = result;
              }).then(() => {
                browser.close();
                return resolve(stuff);
              })
              .catch(console.error);
            //   var sheetsData = await webpage.evaluate(async () => {
                // var musicData = [];
                // const image = document.querySelector('.image > img');
                // const url = image.getAttribute('src');
                // const numPages = document.querySelectorAll('.page').length;
                
                // var scriptsData = Array.from(document.querySelectorAll("script")).filter(x=>x.getAttribute('type')=='application/ld+json');
                // var scriptsInfo  = JSON.parse(scriptsData[0].text);
                
                // musicData.push({"page" : url});
                // var data = { 
                //   "title": scriptsInfo.name,
                //   "datePublished": scriptsInfo.datePublished,
                //   "numberOfPages": numPages,
                //   "url":url
                // };
        
                // return data;
            //   })
            //   return resolve(sheetsData);
              //return resolve(stuff);
            }
            catch(e) {
              return reject(e);
            }
          })  
    }

    CreateLinksArray(data : any) : string[] {
        let links = [];
        imageType = this.getImageType(data.datePublished);
        
        for(var i=0;i<data.numberOfPages;i++){
          const poop = data.url.replace(`_0.${imageType}`, `_${i}.${imageType}`);
          links.push(poop);
        }
        return links;
    }

    getImageType(datePublished: Date) : string {
        if(new Date(datePublished) >= NEW_API_DATE)
          return "svg";
        
        return "png";
    }
}