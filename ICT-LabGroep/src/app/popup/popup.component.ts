import { Component, OnInit } from '@angular/core';
import { PopoverController, NavParams, Events } from '@ionic/angular';
import { OpenNativeSettings } from '@ionic-native/open-native-settings/ngx';


@Component({
  selector: 'app-popup',
  templateUrl: './popup.component.html',
  styleUrls: ['./popup.component.scss'],
})
export class PopupComponent implements OnInit {
    page;
  constructor(private events: Events,
                                private navParams: NavParams,
                                private popoverController: PopoverController) { }

  ngOnInit() {
    this.page = this.navParams.get('data');
    }

  eventFromPopover() {
        this.events.publish('fromPopoverEvent');
        this.popoverController.dismiss();
      }
}
