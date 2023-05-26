import { Injectable } from '@angular/core';
import { DateAdapter } from '@angular/material/core';
import { TranslateService } from '@ngx-translate/core';
import { Subject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TranslationService {

  currentLang: string;
  language = new Subject<string>();

  constructor(private translate: TranslateService, private dateAdapter: DateAdapter<Date>) { }

  /**
   * 
   * Obtenciñón y gestión del idioma acutal de la aplicación.
   * 
   */
  getTranslations(){
    if(localStorage.getItem('lang')) {
      this.currentLang = localStorage.getItem('lang') || '';
    } else {
      this.currentLang = 'es';
      localStorage.setItem('lang', this.currentLang);
    }
    this.translate.use(this.currentLang);
    this.language.next(this.currentLang);
  }

  /**
   * Establecimiento del idioma a utilizar en la aplicación.
   * 
   * @param language Idioma a utilizar en la aplicación.
   */
  setLang(language:string){
    localStorage.setItem('lang', language);
    this.currentLang = language;
    this.language.next(this.currentLang);
    this.translate.use(language);
    this.dateAdapter.setLocale(language);
  }

  /**
   * Obtención del idioma usado actualmente en la aplicación.
   * 
   * @returns string con el idioma utilizado.
   */
  getLang(): string{
    return this.currentLang;
  }
}
