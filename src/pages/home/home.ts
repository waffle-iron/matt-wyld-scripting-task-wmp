import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Geolocation } from '@ionic-native/geolocation';

import { Config } from '../../config.model';
import { HttpService } from '../../services/http.service';
import { LoadingService } from '../../services/loading.service';
import { ToastService } from '../../services/toast.service';

import { Ilocation } from '../../interfaces/location.interface';

import { Diagnostic } from '@ionic-native/diagnostic';

import { ListPage } from '../list/list';

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
    private ToastService: ToastService,
    private Diagnostic: Diagnostic
  ) {}

  private neighbourhood: any;
  public loc: Ilocation;
  public postcode: string;
  public shouldAutoUpdate: Boolean = false;
  public locationSubscription: any;

  ionViewDidLoad() {
    this.getLocation();
  }

  // attempt to get the users location, if this fails ask for a postcode
  getLocation(): void {
    //this.LoadingService.presentLoader('gettingLocation', 'Fetching your location...');
    this.loc = null; // Mwyld: clear down any existing location details
    this.loc = {
      showSpinner: true,
      hasErrored: false,
      title: 'We are automatically locating you',
      details: 'Retrieving Longitude and Latitude...'
    };

    this.geolocation.getCurrentPosition()
      .then((data) => this.updatePosition(data))
      .catch((err) => this.handleError(err));

    // MWyld: watch for following updates to location
  }

  private updatePosition(data): void {
    if(data.coords) {
      this.loc.title ='We have located you!';
      this.loc.longitude = data.coords.longitude;
      this.loc.latitude = data.coords.latitude;
      this.loc.showSpinner = false;
      this.getLocationArea();
    } else {
      this.handleError({message: 'No co-ordinates are available'})
    }
  }

  private handleError(error): void {
    this.loc.hasErrored = true
    this.loc.title = `We couldn't find your location`;
    this.loc.details = `or you rejected location access`;
    this.loc.showSpinner = false;
    this.ToastService.presentToast(error.message)
  }

  private getLocationArea(): void {
    this.loc.showSpinner = true;
    this.loc.details = 'Retrieving area details...';
    this.HttpService.get(`${this.config.api.postcode}/postcodes?lon=${this.loc.longitude}&lat=${this.loc.latitude}&limit=1`)
      .subscribe((data) => {
        this.loc.showSpinner = false;
        let d = data.result[0];
        console.log(data.result[0])
        if(data.status === 200) {
          this.loc.parish = d.parish;
          this.loc.district = d.admin_district;
          this.loc.county = d.admin_county;
          this.loc.region = d.region;
          this.loc.title = 'We have located you in:';
          this.loc.details = `${d.admin_district}`;
          this.postcode = d.postcode; // MWyld populate the nearest postcode into the input for ease of use
        } else {
          this.loc.title ='We have located you!';
          this.loc.details = 'Could not retrieve area details.';
        }
      });
  }

  public getLngLatFromPostcode(): void {

    // check if the postcode is a valid UK postcode using Regex
    let isPostcode = this.config.regex.ukPostcode.test(this.postcode);

    if(!isPostcode) {
      this.ToastService.presentToast(`That doesn\'t appear to be a valid UK Postcode`);
    } else {
        this.HttpService.get(`${this.config.api.postcode}/postcodes/${this.postcode}`)
          .subscribe(
            (data) => {
              // format the data to match the geolocation response
              let d = data.result
              d.coords = {
                longitude: d.longitude,
                latitude: d.latitude
              }
              this.updatePosition(d)
            },
            (error) => {
              error.message = error.error.error // Mwyld: a strangely structured response from postcode API here :)
              this.handleError(error)
            }
          );
    }


 }

 public toggleAutoUpdateLocation(): void {
   if(this.shouldAutoUpdate) {
     console.log("ON")
     this.locationSubscription = this.geolocation
     .watchPosition()
     .subscribe(
       data => this.updatePosition(data),
       error => this.handleError(error)
     );
   } else {
     if(this.locationSubscription) {
       console.log("OFF")
       this.locationSubscription.unsubscribe();
     }
   }
 }

 public goToList(): void {
   this.navCtrl.push(ListPage, this.loc);
 }

}
