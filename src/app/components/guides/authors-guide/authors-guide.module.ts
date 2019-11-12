import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthorsGuideComponent } from './authors-guide.component';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [AuthorsGuideComponent],
  exports: [AuthorsGuideComponent],
  imports: [
    CommonModule,
    DropdownModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class AuthorsGuideModule { }
