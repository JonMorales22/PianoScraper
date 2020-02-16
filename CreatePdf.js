const PDFDocument = require('pdfkit');
const SvgToPdf = require('svg-to-pdfkit');
const fs = require('fs');
const axios = require('axios');
const https = require('https');

const directory = "results";
const pdf = new PDFDocument;

async function DownloadPngFiles(urls, filename) {
    await Promise.all(urls.map((url, i) => DownloadSinglePngFile(url, `${filename}_${i}`)))
} 

function DownloadSinglePngFile(url, filename) {
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

async function DownloadPdfFiles(urls, filename) {
    console.log(`Downloading file ${filename}...`)
    for(var i=0;i<urls.length;i++) {
        const page = await axios.get(urls[i]);
        SvgToPdf(pdf, page.data, 0, 0);
        if(i!=urls.length-1) {
            pdf.addPage();
        }
    }
    
    WriteToFile(`${directory}/${filename}.pdf`);
    console.log(`Download complete!`);
}

function WriteToFile(filename) {
    const file = fs.createWriteStream(filename);
    pdf.pipe(file);
    pdf.end();
}

exports.DownloadPngFiles = DownloadPngFiles;
exports.DownloadPdfFiles = DownloadPdfFiles;