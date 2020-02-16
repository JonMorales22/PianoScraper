import { PdfDownloader } from './PdfDownloader'
import { PngDownloader } from './PngDownloader'
import { MuseScraper } from './MuseScraper';

function Test() : void {
    console.log("ass");
    const downloader = new PdfDownloader();
    const downloader2 = new PngDownloader();
    const museScraper = new MuseScraper("https://musescore.com/user/12461571/scores/3291706");

    museScraper.ScrapeWebsite().then((data)=>{
        console.log(data);
        let downloader;
        switch(data.type) {
            case "svg": {
                downloader = new PdfDownloader();
                break;
            }
            case "png": {
                downloader = new PngDownloader();
                break;
            }
        }

        downloader.Download(data.links, data.title);
    }).catch(console.error);

    // console.log(downloader.Hello());
    // console.log(downloader2.Hello());

    // const pngUrls = [
    //     'https://musescore.com/static/musescore/scoredata/gen/6/0/7/3291706/7a70ebdcc95c47e646069960d4e97710703cad3d/score_0.png?no-cache=1579172803',
    //     'https://musescore.com/static/musescore/scoredata/gen/6/0/7/3291706/7a70ebdcc95c47e646069960d4e97710703cad3d/score_1.png?no-cache=1579172803',
    //     'https://musescore.com/static/musescore/scoredata/gen/6/0/7/3291706/7a70ebdcc95c47e646069960d4e97710703cad3d/score_2.png?no-cache=1579172803',
    //     'https://musescore.com/static/musescore/scoredata/gen/6/0/7/3291706/7a70ebdcc95c47e646069960d4e97710703cad3d/score_3.png?no-cache=1579172803'
    // ];

    // const pdfUrls = [
    //     'https://musescore.com/static/musescore/scoredata/gen/4/4/4/5256444/781033330101c40ea713f74e75a7c5d1d131a4a1/score_0.svg?no-cache=1581165199',
    //     'https://musescore.com/static/musescore/scoredata/gen/4/4/4/5256444/781033330101c40ea713f74e75a7c5d1d131a4a1/score_1.svg?no-cache=1581165199',
    //     'https://musescore.com/static/musescore/scoredata/gen/4/4/4/5256444/781033330101c40ea713f74e75a7c5d1d131a4a1/score_2.svg?no-cache=1581165199',
    //     'https://musescore.com/static/musescore/scoredata/gen/4/4/4/5256444/781033330101c40ea713f74e75a7c5d1d131a4a1/score_3.svg?no-cache=1581165199',
    //     'https://musescore.com/static/musescore/scoredata/gen/4/4/4/5256444/781033330101c40ea713f74e75a7c5d1d131a4a1/score_4.svg?no-cache=1581165199',
    //     'https://musescore.com/static/musescore/scoredata/gen/4/4/4/5256444/781033330101c40ea713f74e75a7c5d1d131a4a1/score_5.svg?no-cache=1581165199',
    //     'https://musescore.com/static/musescore/scoredata/gen/4/4/4/5256444/781033330101c40ea713f74e75a7c5d1d131a4a1/score_6.svg?no-cache=1581165199'
    // ]



    // downloader.Download(pdfUrls, "Shallow")
    // downloader2.Download(pngUrls, "River Flows In You")
}

Test();