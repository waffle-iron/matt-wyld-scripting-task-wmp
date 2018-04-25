export interface IPerson {
  name: string,
  rank: string,
  bio?: string,
  contact_details?: IContactDetails,
  image?: string
  cover?: string
}

export interface IContactDetails {
  email?: string,
  telephone?: string,
  mobile?: string,
  fax?: string,
  web?: string,
  address?: string,
  facebook?: string,
  twitter?: string,
  youtube?: string,
  myspace?: string,
  bebo?: string,
  flickr?: string,
  "google-plus"?: string,
  forum?: string,
  "e-messaging"?: string,
  blog?: string,
  rss?: string,
}
