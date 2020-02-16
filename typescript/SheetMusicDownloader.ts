export interface SheetMusicDownloader {
    Download(urls : string[], filename: string) : Promise<null[]>
}

