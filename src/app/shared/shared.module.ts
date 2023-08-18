import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

import { WrapperComponent } from './layout/wrapper.component';
import { MaterialModule } from './material.module';
import { IMaskModule } from 'angular-imask';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    RouterModule,
    MaterialModule,
    IMaskModule,
    ReactiveFormsModule,
  ],
  declarations: [
    WrapperComponent,
  ],
  exports: [
    CommonModule,
    FormsModule,
    BrowserAnimationsModule,
    MaterialModule,
    IMaskModule,
    WrapperComponent,
  ],
  entryComponents: [
  ],
})
export class SharedModule { }
