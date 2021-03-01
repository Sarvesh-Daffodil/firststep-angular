import { Injectable } from '@angular/core';

const excludeUrls = [];

@Injectable({
    providedIn: 'root'
})
export class LoaderService {

    public loader: any = {
        show: false,
        pendingService: 0
    };

    constructor() { }

    /**
     * Function to show loader
     */
    showLoader(url?) {
        let excludedUrls = excludeUrls.filter(element => element.includes(url));
        if (!(excludedUrls.length > 0)) {
            this.loader.show = true;
            this.loader.pendingService += 1;
        }
    }

    /**
     * Function to hide loader
     */
    hideLoader(url?) {
        let excludedUrls = excludeUrls.filter(element => element.includes(url));
        if (!(excludedUrls.length > 0)) {
            this.loader.pendingService -= 1;
            if (this.loader.pendingService === 0)
                this.loader.show = false;
        }
    }
}