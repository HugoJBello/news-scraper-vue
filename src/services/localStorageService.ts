export class LocalStorageService {

    constructor() {
       
    }

    setCustomUrl = (customUrl:string) => {
        localStorage.setItem("customUrl", customUrl)
    }

    getCustomUrl = () => {
        return localStorage.getItem("customUrl")
    }


}