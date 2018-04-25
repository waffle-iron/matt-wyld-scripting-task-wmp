import { Injectable } from '@angular/core';
import { ToastController } from 'ionic-angular';

@Injectable()
export class ToastService {
  constructor(
    private toastCtrl: ToastController
  ) {}

  presentToast(content: string): void {
    let toast = this.toastCtrl.create({
      message: content,
      duration: 5000,
      position: 'bottom'
    });
    toast.present();
  }

}
