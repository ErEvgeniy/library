import { NgModule } from '@angular/core';
import {
  MatButtonModule,
  MatInputModule,
  MatToolbarModule,
  MatFormFieldModule,
  MatSelectModule,
  MatIconModule,
  MatTableModule,
  MatProgressSpinnerModule,
  MatDialogModule,
  MAT_DATE_LOCALE,
} from '@angular/material';

const modules = [
  MatButtonModule,
  MatInputModule,
  MatFormFieldModule,
  MatSelectModule,
  MatIconModule,
  MatTableModule,
  MatProgressSpinnerModule,
  MatToolbarModule,
  MatDialogModule,
];

@NgModule({
  imports: modules,
  exports: modules,
  providers: [
    {provide: MAT_DATE_LOCALE, useValue: 'ru-RU'},
  ]
})
export class MaterialModule { }
