import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { Config } from '../../config.model';
import { LoadingService } from '../../services/loading.service';
import { HttpService } from '../../services/http.service';

import { Ilocation } from '../../interfaces/location.interface';
import { INeighbourhood } from '../../interfaces/neighbourhood.interface';
import { IPerson } from '../../interfaces/person.interface';

import { DetailPage } from '../detail/detail';

@Component({
  selector: 'page-list',
  templateUrl: 'list.html'
})
export class ListPage {

  public location: Ilocation;
  public team: IPerson[];
  private neighbourhood: INeighbourhood;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private config: Config,
    private HttpService: HttpService,
    private LoadingService: LoadingService
  ) {
    this.location = navParams.data;
  }


  ionViewDidLoad() {
    this.getNeighbourhoodCode();
  }

  getNeighbourhoodCode(): void {
    this.LoadingService.presentLoader('gettingNeighbourhoodCode', `Fetching ${this.location.parish} Neighbourhood Team Details...`);
    this.HttpService.get(`${this.config.api.police}/locate-neighbourhood?q=${this.location.latitude},${this.location.longitude}`)
    .subscribe((data) => {
      this.neighbourhood = data
      console.log(this.neighbourhood);
      this.LoadingService.dismissLoader('gettingNeighbourhoodCode');
      this.getNeighbourhoodTeam();
    });
  }

  getNeighbourhoodTeam(): void {
    if(this.neighbourhood.force && this.neighbourhood.neighbourhood) {
      this.LoadingService.presentLoader('gettingNeighbourhoodTeam', 'Fetching your Neighbourhood Team...');
      this.HttpService.get(`${this.config.api.police}/${this.neighbourhood.force}/${this.neighbourhood.neighbourhood}/people`)
      .subscribe((data) => {
        this.team = data
        this.team.unshift(this.config.listAdditions)
        this.LoadingService.dismissLoader('gettingNeighbourhoodTeam');
        console.log(this.team)
      });
    }
  }

  goToDetails(selectedPerson: IPerson): void {
    console.log("test", selectedPerson);
    this.navCtrl.push(DetailPage, selectedPerson);
  }

  goBack(): void {
    console.log("pop view")
    this.navCtrl.pop();
  }


}
