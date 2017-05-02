import { Injectable } from '@angular/core';
import {TranslateService} from '@ngx-translate/core';

@Injectable()
export class TranslationService{

    dir = 'ltr';
    LANGUAGES = ['en', 'ar']

    constructor(private translate: TranslateService){
        this.translate.addLangs(this.LANGUAGES);
        this.translate.setDefaultLang(this.LANGUAGES[0]);
        this.translate.use(this.LANGUAGES[0]);
    }

    changeLang(lang: string){
        this.translate.use(lang);
        
        if(lang == this.LANGUAGES[0])
            this.dir = 'ltr';
        else
            this.dir = 'rtl';
    }

    getCurrentLang(): String{
        return this.translate.currentLang;
    }
}