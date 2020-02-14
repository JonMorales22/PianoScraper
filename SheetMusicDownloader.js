const PDFDocument = require('pdfkit');
const SvgToPdf = require('svg-to-pdfkit');
const fs = require('fs');
const axios = require('axios');
const https = require('https');

class ISheetMusicDownloader {
     Download(urls, filename); 
}

class PdfDownloader extends ISheetMusicDownloader {
    async Download(urls, filename) {
        console.log(`Downloading file ${filename}...`)
        for(var i=0;i<urls.length;i++) {
            const page = await axios.get(urls[i]);
            SvgToPdf(pdf, page.data, 0, 0);
            if(i!=urls.length-1) {
                pdf.addPage();
            }
        }
        
        this.WriteToFile(`${directory}/${filename}.pdf`);
        console.log(`Download complete!`);
    }
    
    WriteToFile(filename) {
        const file = fs.createWriteStream(filename);
        pdf.pipe(file);
        pdf.end();
    }
}

class IPngDownloadeder extends SheetMusicDownloader {
    async Download(url, filename) {
        await Promise.all(urls.map((url, i) => DownloadSinglePngFile(url, `${filename}_${i}`)))
    }     
    
    DownloadSinglePngFile(url, filename) {
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