import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { CategoryPage } from './category';
import { Ng2SearchPipeModule } from 'ng2-search-filter';

@NgModule({
  declarations: [
    CategoryPage,
  ],
  imports: [
    Ng2SearchPipeModule,
    IonicPageModule.forChild(CategoryPage),
  ],
})
export class CategoryPageModule {}
