import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorsGuideComponent } from './authors-guide.component';

@NgModule({
  declarations: [AuthorsGuideComponent],
  exports: [AuthorsGuideComponent],
  imports: [
    CommonModule
  ]
})
export class AuthorsGuideModule { }
