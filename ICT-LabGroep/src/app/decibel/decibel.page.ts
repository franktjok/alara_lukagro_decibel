import { Component } from '@angular/core';
import { NavController } from '@ionic/angular';
import { AlertController } from '@ionic/angular';
import { DBMeter } from '@ionic-native/db-meter/ngx';

@Component({
  selector: 'app-decibel',
  templateUrl: './decibel.page.html',
  styleUrls: ['./decibel.page.scss'],
  providers: [DBMeter]
})
export class DecibelPage {
    dbErtek;
    dbSzam;
    dbDB;
    dbMin;
    dbMax;
    subscription;
    errMessage;
    currentAmplitude;
  constructor(private dbMeter: DBMeter, public navCtrl: NavController, public alertController: AlertController) {
    this.errMessage = "";
    this.dbSzam = 0;
    this.dbDB = 0;
    this.dbMin = 0;
    this.dbMax = 0;
    this.dbErtek = [];
  }
   startMeter(){

       this.subscription = this.dbMeter.start().subscribe(
      data => this.dbErtek
      );
        this.dbSzam = this.dbErtek.length;
        this.dbDB = this.dbAVG(this.dbErtek);
        this.dbMax =  Math.max.apply(null,this.dbErtek[this.dbSzam]);
        this.dbMin =  Math.min.apply(null,this.dbErtek[this.dbSzam]);
     }

   dbAVG(array){
       var sum = 0;
       for( var i = 0; i < array.length; i++ ){
           sum += parseInt( array[i], 10 );
       }
       sum = sum /array.length;
       return sum;
     }

   checkMeter(){
       this.dbMeter.isListening().then(
       (isListening: boolean) => console.log(isListening)
       );
     }

   stopMeter(){
       this.subscription.unsubscribe();
       this.dbMeter.delete().then(
       () => this.errMessage = "Deleted DB Meter instance",
       error => this.errMessage = "Error occurred while deleting DB Meter instance"
       );
       this.dbSzam = 0;
       this.dbErtek = 0;
     }

   ionViewDidLoad() {
       console.log('ionViewDidLoad DbmeterPage');

       let timer = setInterval(() => {
         // Start listening
         let subscription = this.dbMeter.start().subscribe(
             data => this.currentAmplitude = data
         );
       }, 100);

     }

     async presentAlertPrompt() {
         const alert = await this.alertController.create({
           header: 'Practice Decibel Levels!',
           message: `
           <ul>
           <li>140dB: Gun Shots</li>
           <li>130dB: Ambulance</li>
           <li>120dB: Thunder</li>
           <li>110dB: Concerts</li>
           <li>100dB: Subway Train</li>
           <li>90dB: Motorcycle</li>
           <li>80dB: Busy Traffic</li>
           <li>70dB: Restaurant</li>
           <li>60dB: Conversation</li>
           <li>50dB: Quiet Office</li>
           <li>40dB: Quiet Library</li>
           <li>30dB: Whisper</li>
           <li>20dB: Clock Ticking</li>
           <li>10dB: Breathing</li>
           </ul>`,
           buttons: [
              {
               text: 'Ok',
               handler: () => {
                 console.log('Confirm Ok');
               }
             }
           ]
         });

         await alert.present();
       }


}
