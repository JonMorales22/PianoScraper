const fs = require('fs');
const axios = require('axios');
const https = require('https');

const directory = "results";
import { ISheetMusicDownloader } from "./ISheetMusicDownloader"

export class PngDownloader implements ISheetMusicDownloader {
    async Download(urls : string[], filename : string) : Promise<void> {
        return new Promise<void>(async(resolve, reject) => {
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

    async DownloadSinglePngFile(url : string, filename : string) : Promise<void> {
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
