const PDFDocument = require('pdfkit');
const SvgToPdf = require('svg-to-pdfkit');
const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');
const https = require('https');

const directory = "results";
const pdf = new PDFDocument;
// const siteUrl = "https://musescore.com/user/168725/scores/1587526"
// const urlsArr = [
//     "https://musescore.com/static/musescore/scoredata/gen/1/9/6/4873691/52076ed23df30427d9095b89a94a589062f9570a/score_0.svg?no-cache=1531731575&nb=1",
//     "https://musescore.com/static/musescore/scoredata/gen/6/2/5/1587526/ac9527c3affa7566e9b43dbf17d2c0804335ccbd/score_0.svg?no-cache=1531731630&nb=1"
//     "https://musescore.com/static/musescore/scoredata/gen/1/9/6/4873691/52076ed23df30427d9095b89a94a589062f9570a/score_1.svg?no-cache=1531731575&nb=1"
// ]

async function DownloadPngFiles(urls) {
    await Promise.all(urls.map(DownloadSinglePngFile))
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
            // let response = await axios.get(url);
            // console.log(response);
            // const file = fs.createWriteStream(`${directory}/page_${0}.png`);
            // response.pipe(file);
            // file.on('finish', function() {
            //     file.close();
            //     console.log("Download complete!");
            //     return;
            // })
        }
        catch(e) {
            reject(e);
        }
    })
}

async function GetSheetMusic(urls) {
    for(var i=0;i<urls.length;i++) {
        const page = await axios.get(urls[i]);
        SvgToPdf(pdf, page.data, 0, 0);
        if(i!=urls.length-1) {
            pdf.addPage();
        }
    }
    
    WriteToFile("results/result.pdf");
}

function WriteToFile(filename) {
    const file = fs.createWriteStream(filename);
    pdf.pipe(file);
    pdf.end();
}

//GetUrls();

exports.DownloadPngFiles = DownloadPngFiles;
exports.DownloadSinglePngFile = DownloadSinglePngFile;
// GetSheetMusic(urlsArr);