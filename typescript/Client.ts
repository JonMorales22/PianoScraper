import { PdfDownloader } from './PdfDownloader'
import { PngDownloader } from './PngDownloader'
import { MuseScraper } from './MuseScraper';

function Test() : void {
    // const museScraper = new MuseScraper("https://musescore.com/user/12461571/scores/3291706");
    const museScraper =  new MuseScraper("https://musescore.com/user/12461571/scores/3291706");

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
}

Test();