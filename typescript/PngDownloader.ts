const fs = require('fs');
const axios = require('axios');
const https = require('https');

const directory = "results";
import { ISheetMusicDownloader } from "./ISheetMusicDownloader"

export class PngDownloader implements ISheetMusicDownloader {
    async Download(urls : string[], filename : string) : Promise<void> {
        return new Promise<void>(async(resolve, reject) => {
            try {
                const ass = filename.replace(/ /g, '_');
                this.CreateDirectory(`${directory}/${ass}`);
                await Promise.all(urls.map((url, i) => this.DownloadSinglePngFile(url, ass, i)))
                return resolve;
            }
            catch(e) {
                reject(e)
            }
        }) 
    } 

    private async DownloadSinglePngFile(url : string, filename : string, index: number) : Promise<void> {
        return new Promise((resolve, reject) => {
            try{
                https.get(url, function(res) {
                    console.log(`Downloading file @ ${url}...`);
                    const file = fs.createWriteStream(`${directory}/${filename}/${filename}_${index}.png`);
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

    private CreateDirectory(directory : string) : void {
        if(!fs.existsSync(directory)) {
            fs.mkdirSync(directory)
        }
    }
}
