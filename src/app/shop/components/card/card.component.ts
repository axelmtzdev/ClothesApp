import { Component, Input, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'shop-card',
  templateUrl: './card.component.html',
  styles: ``
})
export class CardComponent implements OnInit{
  ngOnInit(): void {
    if(!this.product) throw new Error('Method not implemented.');
  }


  @Input()
  public product!: Product

}
