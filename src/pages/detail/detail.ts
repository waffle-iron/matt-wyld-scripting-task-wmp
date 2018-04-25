import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { IPerson } from '../../interfaces/person.interface';

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})
export class DetailPage {
  public person: IPerson;

  constructor(public navCtrl: NavController, public navParams: NavParams) {
    this.person = navParams.data;
  }

  emailDetails(): void {
    window.location.href = `mailto:?subject=Neighbourhood Team Police Details&body=
    ${this.person.name}
    ${this.person.rank}
    ${this.person.bio}`;
  }

  isContactDetailsEmpty(): Boolean {
    return Object.keys(this.person.contact_details).length === 0;
  }

  goBack(): void {
    this.navCtrl.pop();
  }

}
