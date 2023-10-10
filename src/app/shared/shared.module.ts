import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { LazyImageComponent } from './components/lazy-image/lazy-image.component';
import { HeaderComponent } from './components/header/header/header.component';



@NgModule({
  declarations: [
    LazyImageComponent,
    HeaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    LazyImageComponent,
    HeaderComponent
  ]
})
export class SharedModule { }
