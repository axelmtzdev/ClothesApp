import { Component, OnInit } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { ShopService } from '../../services/shop.service';
import { ActivatedRoute, Router } from '@angular/router';
import { switchMap } from 'rxjs';

@Component({
  selector: 'app-product-page',
  templateUrl: './product-page.component.html',
  styles: ``
})
export class ProductPageComponent implements OnInit{

  public product?: Product;

  constructor(
    private shopService: ShopService,
    private activatedRoute: ActivatedRoute,
    private router: Router
  ){}

  ngOnInit(): void {
    this.activatedRoute.params.pipe(
      switchMap(({id}) => this.shopService.getProductById(id)),
    ).subscribe(product => {
      if(!product) return this.router.navigate(['/product/list']);

      this.product = product;
      return;
    })
  }

  goBack():void{
    this.router.navigate(['/products/list']);
  }



}
