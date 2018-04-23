import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { Config } from '../../config';
import { HttpService } from '../../services/http.service';
import { LoadingService } from '../../services/loading.service';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(
    public navCtrl: NavController,
    private geolocation: Geolocation,
    private config: Config,
    private HttpService: HttpService,
    private LoadingService: LoadingService,
    private ToastService: ToastService
  ) {}

  private lat: number;
  private lng: number;
  private neighbourhood: any;
  private team: any;

  ionViewDidLoad() {
    this.getLocation();
  }

  // attempt to get the users location, if this fails ask for a postcode
  getLocation(): void {
    this.LoadingService.presentLoader('gettingLocation', 'Fetching your location...');
    this.geolocation.getCurrentPosition().then((resp) => {
      this.LoadingService.dismissLoader('gettingLocation');
      this.lat = resp.coords.latitude;
      this.lng = resp.coords.longitude;
      console.log(resp.coords.latitude, resp.coords.longitude);
    }).catch((error) => {
      this.LoadingService.dismissLoader('gettingLocation');
      this.ToastService.presentToast(error.message)
      console.log('Error getting location', error);
    });
    let watch = this.geolocation.watchPosition();
    watch.subscribe((data) => {
      console.log("data", data)
     // data can be a set of coordinates, or an error (if an error occurred).
     // data.coords.latitude
     // data.coords.longitude
     this.getNeighbourhoodCode();
    });
  }

  getNeighbourhoodCode(): void {
    this.LoadingService.presentLoader('gettingNeighbourhoodCode', 'Fetching your Neighbourhood Location...');
    this.HttpService.get(`${this.config.api}locate-neighbourhood?q=${this.lat},${this.lng}`)
    .subscribe((data) => {
      this.neighbourhood = data
      console.log(this.neighbourhood);
      this.LoadingService.dismissLoader('gettingNeighbourhoodCode');
      this.getNeighbourhoodTeam();
    });
  }

  getNeighbourhoodTeam(): void {
    this.LoadingService.presentLoader('gettingNeighbourhoodTeam', 'Fetching your Neighbourhood Team...');
    this.HttpService.get(`${this.config.api}/${this.neighbourhood.force}/${this.neighbourhood.neighbourhood}/people`)
    .subscribe((data) => {
      this.team = data
      this.LoadingService.dismissLoader('gettingNeighbourhoodTeam');
      console.log(this.team)
    });
}



}
