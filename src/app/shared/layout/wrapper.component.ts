import { Component } from '@angular/core';
import { LoaderService } from "../../logic/services/loader.service";
import { Router } from "@angular/router";

@Component({
  selector: 'app-wrapper',
  templateUrl: './wrapper.component.html',
  styleUrls: ['./wrapper.component.scss']
})
export class WrapperComponent {

  constructor(
    private _loader: LoaderService,
    private router: Router,
  ) { }

  get loader(): LoaderService {
    return this._loader;
  }

  navigate(path: string): void {
    this.router.navigateByUrl(path);
  }

}
