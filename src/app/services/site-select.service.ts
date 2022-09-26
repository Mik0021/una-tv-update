import { environment } from 'src/environments/environment';
import { SiteSelect } from './../interfaces/site-select.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class SiteSelectService {
  siteList: SiteSelect = {
    sites: environment.SITE_SELECT,
  };

  constructor() {}

  getSites() {
    return this.siteList;
  }
}
