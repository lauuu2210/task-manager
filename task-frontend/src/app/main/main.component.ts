import { Component, ViewEncapsulation } from '@angular/core';
import { TranslationService } from '../services/translation.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class MainComponent {

  language: string;

  constructor(private translationService: TranslationService) {
    this.language = this.translationService.getLang();
  }

  /**
   * 
   * Cambio de lenguaje en función del que se encuentre activo actualmente.
   * 
   */
  changeLang() {
    this.language = this.language != "en" ? "en" : "es";
    this.translationService.setLang(this.language);
  }

}
