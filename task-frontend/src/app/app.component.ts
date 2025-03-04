import { Component } from '@angular/core';
import { TranslationService } from './services/translation.service';

@Component({
  selector: 'app-root',
  template: `<div style="height:100%">       <router-outlet></router-outlet>     </div>`
})
export class AppComponent {

  title = 'task-frontend';

  constructor(private translation: TranslationService) {
    this.translation.getTranslations();
  }
}
