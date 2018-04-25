import { Injectable } from '@angular/core';
import { IPerson } from './interfaces/person.interface'

export interface IAPI {
  police: string,
  postcode: string,
}

export interface IRegex {
  ukPostcode: RegExp
}

@Injectable()
export class Config {
    api: IAPI = {
      police: 'https://data.police.uk/api',
      postcode: 'https://api.postcodes.io'
    };
    regex: IRegex = {
      ukPostcode: /([Gg][Ii][Rr] 0[Aa]{2})|((([A-Za-z][0-9]{1,2})|(([A-Za-z][A-Ha-hJ-Yj-y][0-9]{1,2})|(([A-Za-z][0-9][A-Za-z])|([A-Za-z][A-Ha-hJ-Yj-y][0-9]?[A-Za-z]))))\s?[0-9][A-Za-z]{2})/i
    };
    listAdditions: IPerson = {
      name: 'Matt Wyld',
      bio: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras ut turpis ipsum. Sed congue, lorem vitae vestibulum auctor, arcu magna congue lacus, id efficitur dui urna eu felis. Mauris at nisl et lacus malesuada eleifend. Etiam quis nulla eu velit malesuada pharetra vel sed arcu. Phasellus tincidunt odio eu neque interdum dignissim. Sed iaculis lacus non porttitor congue. Aenean maximus nunc a ante pulvinar, sit amet tempor ipsum malesuada.',
      contact_details: {
        email: 'matt@wyldweb.com',
        telephone: '07824 333950',
        mobile: '07824 333950',
        fax: null,
        web: 'https://www.wyldweb.com',
        address: 'Droitwich',
        facebook: null,
      },
      rank: 'Potiental Software Engineer',
      image: '../../assets/imgs/matt.jpg',
      cover: '../../assets/imgs/matt-cover.jpg'
    }
}
