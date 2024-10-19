import { Component } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { ShopService } from '../../services/shop.service';

@Component({
  selector: 'app-list-page',
  templateUrl: './list-page.component.html',
  styles: ``
})
export class ListPageComponent {
  public product:Product[] = [];

  constructor (private shopService:ShopService){}

  ngOnInit(): void {
    this.shopService.getProducts()
      .subscribe(product => this.product = product)
  }
}
