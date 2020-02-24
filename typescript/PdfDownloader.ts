const PDFDocument = require('pdfkit');
const SvgToPdf = require('svg-to-pdfkit');
const fs = require('fs');
const axios = require('axios');

const directory = "results";
const pdf = new PDFDocument;
import { ISheetMusicDownloader } from "./ISheetMusicDownloader"

export class PdfDownloader implements ISheetMusicDownloader {
    async Download(urls : string[], filename: string) : Promise<void> {
        console.log(`Downloading file ${filename}...`)
        return new Promise<void>( async(resolve, reject) => {
            try{
                for(var i=0;i<urls.length;i++) {
                    const page = await axios.get(urls[i]);
                    SvgToPdf(pdf, page.data, 0, 0);
                    if(i!=urls.length-1) {
                        pdf.addPage();
                    }
                }
        
                this.WriteToFile(`${directory}/${filename}.pdf`);
                console.log(`Download complete!`);
                return resolve;
            }
            catch(e) {
                return reject(e)
            }
        })
    }

    private WriteToFile(filename : string) : void {
        const file = fs.createWriteStream(filename);
        pdf.pipe(file);
        pdf.end();
    }
}
