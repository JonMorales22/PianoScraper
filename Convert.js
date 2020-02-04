// const SvgToPdf = require('svg-to-pdfkit');
const PDFDocument = require('pdfkit');
const SvgToPdf = require('svg-to-pdfkit');

const pdf = new PDFDocument;
const fs = require('fs');
const axios = require('axios');

const siteUrl = "https://musescore.com/static/musescore/scoredata/gen/1/9/6/4873691/52076ed23df30427d9095b89a94a589062f9570a/score_0.svg?no-cache=1531731575&nb=1"
const siteUrl2 = "https://musescore.com/static/musescore/scoredata/gen/1/9/6/4873691/52076ed23df30427d9095b89a94a589062f9570a/score_1.svg?no-cache=1531731575&nb=1";

const test = "M38.846 113.347h544.808M38.846 118.347h544.808M38.846 123.347h544.808M38.846 128.347h544.808M38.846 133.347h544.808M38.846 165.847h544.808M38.846 170.847h544.808M38.846 175.847h544.808M38.846 180.847h544.808M38.846 185.847h544.808M38.846 241.962h544.808M38.846 246.962h544.808M38.846 251.962h544.808M38.846 256.962h544.808M38.846 261.962h544.808M38.846 294.462h544.808M38.846 299.462h544.808M38.846 304.462h544.808M38.846 309.462h544.808M38.846 314.462h544.808M38.846 370.577h544.808M38.846 375.577h544.808M38.846 380.577h544.808M38.846 385.577h544.808M38.846 390.577h544.808M38.846 423.077h544.808M38.846 428.077h544.808M38.846 433.077h544.808M38.846 438.077h544.808M38.846 443.077h544.808M38.846 499.192h544.808M38.846 504.192h544.808M38.846 509.192h544.808M38.846 514.192h544.808M38.846 519.192h544.808M38.846 551.692h544.808M38.846 556.692h544.808M38.846 561.692h544.808M38.846 566.692h544.808M38.846 571.692h544.808M38.846 627.807h544.808M38.846 632.807h544.808M38.846 637.807h544.808M38.846 642.807h544.808M38.846 647.807h544.808M38.846 680.307h544.808M38.846 685.307h544.808M38.846 690.307h544.808M38.846 695.307h544.808M38.846 700.307h544.808"
poop = async function() {
    const page1 = await axios.get(siteUrl);
    const file = fs.createWriteStream("result.pdf"); 
    SvgToPdf(pdf, page1.data,0,0);
    //pdf.pipe(file);
    pdf.addPage();

    const page2 = await(axios.get(siteUrl2));
    SvgToPdf(pdf, page2.data, 0,0);
    pdf.pipe(file)
    pdf.end();
}

function CreatePdfDoc(svg) {
    const doc = new PDFDocument();
    var stream = doc.pipe(fs.createWriteStream("./result.pdf"));
    doc.pipe(fs.createWriteStream("./result.pdf"));
    doc.path(svg)
        .stroke();
    doc.end();
}

poop();