import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GithubUserCardComponent } from './github-user-card.component';

@NgModule({
  declarations: [GithubUserCardComponent],
  exports: [GithubUserCardComponent],
  imports: [
    CommonModule
  ]
})
export class GithubUserCardModule { }
