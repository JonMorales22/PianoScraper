const fs = require('fs');
const axios = require('axios');
const https = require('https');

const directory = "results";
import { SheetMusicDownloader } from "./SheetMusicDownloader"

export class PngDownloader implements SheetMusicDownloader {
    async Download(urls : string[], filename : string) : Promise<null> {
        return new Promise<null>(async(resolve, reject) => {
            try {
                await Promise.all(urls.map((url, i) => this.DownloadSinglePngFile(url, `${filename}_${i}`)))
                return resolve;
            }
            catch(e) {
                reject(e)
            }
        }) 
    } 

    Hello() : string {
        return "I am a png";
    }

    async DownloadSinglePngFile(url : string, filename : string) : Promise<null> {
        return new Promise((resolve, reject) => {
            try{
                https.get(url, function(res) {
                    console.log(`Downloading file @ ${url}...`);
                    const file = fs.createWriteStream(`${directory}/${filename}.png`);
                    res.pipe(file);
                    file.on('finish', function() {
                        file.close();
                        console.log("Download complete!");
                        return resolve;
                    })
                });
            }
            catch(e) {
                reject(e);
            }
        })
    }
}
