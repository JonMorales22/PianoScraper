export interface ISheetMusicDownloader {
    Download(urls : string[], filename: string) : Promise<void>
    Hello() : string
}

