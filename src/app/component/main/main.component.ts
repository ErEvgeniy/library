import { Component } from '@angular/core';
import { Router } from "@angular/router";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent {

  constructor(
    private router: Router,
  ) { }

  redirect(path: string): void {
    this.router.navigateByUrl(path);
  }

}
