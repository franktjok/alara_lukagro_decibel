import { Component } from '@angular/core';
import { NavController, MenuController } from '@ionic/angular';
import { TranslateConfigService } from '../translate-config.service';
import { TranslateModule, TranslateLoader } from '@ngx-translate/core';



@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

selectedLanguage:string;

constructor(public navCtrl: NavController, private menuCtrl: MenuController, private translateConfigService: TranslateConfigService) {
  this.menuCtrl.enable(true);
   this.selectedLanguage = this.translateConfigService.getDefaultLanguage();
  }

  languageChanged(){
      this.translateConfigService.setLanguage(this.selectedLanguage);
    }
}