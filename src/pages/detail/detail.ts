import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { IPerson } from '../../interfaces/person.interface';
import { EmailComposer } from '@ionic-native/email-composer';
import { ToastService } from '../../services/toast.service';

@Component({
  selector: 'page-detail',
  templateUrl: 'detail.html'
})
export class DetailPage {
  public person: IPerson;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private EmailComposer: EmailComposer,
    private ToastService: ToastService
  ) {
    this.person = navParams.data;
  }

  emailDetails(): void {
     this.EmailComposer.open({
       to: '',
       cc: 'matt@wyldweb.com',
       subject: 'Neighbourhood Team Police Details',
       body: `<p><b>${this.person.name}</b></p>
       <p>${this.person.rank}</p>
       <p>${this.person.bio}</p>`,
       isHtml: true
     });
  }

  isContactDetailsEmpty(): Boolean {
    return Object.keys(this.person.contact_details).length === 0;
  }

  goBack(): void {
    this.navCtrl.pop();
  }

}
