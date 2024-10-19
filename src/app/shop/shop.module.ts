import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ShopRoutingModule } from './shop-routing.module';
import { LayoutPageComponent } from './pages/layout-page/layout-page.component';
import { ListPageComponent } from './pages/list-page/list-page.component';
import { NewPageComponent } from './pages/new-page/new-page.component';
import { ProductPageComponent } from './pages/product-page/product-page.component';
import { SearchPageComponent } from './pages/search-page/search-page.component';
import { CardComponent } from './components/card/card.component';
import { MaterialModule } from '../material/material.module';
import { ProductImagePipe } from './pipes/product-image.pipe';


@NgModule({
  declarations: [
    LayoutPageComponent,
    ListPageComponent,
    NewPageComponent,
    ProductPageComponent,
    SearchPageComponent,
    CardComponent,

    ProductImagePipe
  ],
  imports: [
    CommonModule,
    ShopRoutingModule,
    MaterialModule
  ]
})
export class ShopModule { }
