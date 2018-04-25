export interface Ilocation {
  showSpinner: Boolean,
  hasErrored: Boolean,
  title: string,
  details: string,
  longitude?: number,
  latitude?: number,
  parish?: string,
  district?: string,
  county?: string,
  region?: string
}
