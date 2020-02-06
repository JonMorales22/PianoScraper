const PDFDocument = require('pdfkit');
const SvgToPdf = require('svg-to-pdfkit');
const fs = require('fs');
const axios = require('axios');
const cheerio = require('cheerio');
const https = require('https');

const pdf = new PDFDocument;
const siteUrl = "https://musescore.com/user/168725/scores/1587526"
const urlsArr = [
    "https://musescore.com/static/musescore/scoredata/gen/1/9/6/4873691/52076ed23df30427d9095b89a94a589062f9570a/score_0.svg?no-cache=1531731575&nb=1",
    "https://musescore.com/static/musescore/scoredata/gen/6/2/5/1587526/ac9527c3affa7566e9b43dbf17d2c0804335ccbd/score_0.svg?no-cache=1531731630&nb=1"
    "https://musescore.com/static/musescore/scoredata/gen/1/9/6/4873691/52076ed23df30427d9095b89a94a589062f9570a/score_1.svg?no-cache=1531731575&nb=1"
]

async function GetUrls() {
    // const response = await axios.get(siteUrl);
    https.get(siteUrl, function(res) {
        const file = fs.createWriteStream("results/test.txt");
        res.pipe(file);
        file.on('finish', () => {
            //we do a little bit of recursion here by passing in doStuff() to the callback
            file.close();
            console.log("Download complete!");
        });
    })
    //const $ = cheerio.load(response.data);
    

    // console.log(response.data);
    // const poop = $(".page", response.data).each(function(i, elem) {
        // console.log(i);
        // console.log(elem);
    // });
    //console.log(poop);
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

GetUrls();
// GetSheetMusic(urlsArr);