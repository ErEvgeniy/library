import { Injectable } from '@angular/core';

@Injectable()
export class LoaderService {

  showLoader = false;

  show() {
    this.showLoader = true;
  }

  hide() {
    this.showLoader = false;
  }

}
