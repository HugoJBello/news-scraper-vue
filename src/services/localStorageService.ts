export  class LocalStorageService {

    constructor() {
       
    }

    static setCustomUrl = (customUrl:string) => {
        localStorage.setItem("customUrl", customUrl)
    }

    static getCustomUrl = () => {
        return localStorage.getItem("customUrl")
    }

    static setSelectedScraper = (selectedScraper:string) => {
        localStorage.setItem("selectedScraper", selectedScraper)
    }

    static getSelectedScraper = () => {
        return localStorage.getItem("selectedScraper")
    }


}