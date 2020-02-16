export interface IMusicScraper {
    ScrapeWebsite() : Promise<string>
}