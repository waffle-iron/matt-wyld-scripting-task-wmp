import { Injectable } from '@angular/core';
import { LoadingController } from 'ionic-angular';

@Injectable()
export class LoadingService {
  constructor(
    private loadingCtrl: LoadingController
  ) {}

  private loader: Object = {};

  presentLoader(loaderId: string, content: string): void {
    this.loader[loaderId] = this.loadingCtrl.create({
      content: content
    });
    this.loader[loaderId].present();
  }

  dismissLoader(loaderId: string): void {
    this.loader[loaderId].dismiss()
    this.loader[loaderId] = null;
  }
}
