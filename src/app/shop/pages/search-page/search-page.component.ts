import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ShopService } from '../../services/shop.service';
import { Marca, Product } from '../../interfaces/product.interface';
import { tap, switchMap } from 'rxjs';

@Component({
  selector: 'app-search-page',
  templateUrl: './search-page.component.html',
  styles: ``
})
export class SearchPageComponent implements OnInit{

  constructor(private formBuilder:FormBuilder, private shopService:ShopService){}



  public myForm:FormGroup = this.formBuilder.group({
    marca:['', Validators.required]
  })

  get marca():Marca[]{
    return this.shopService.marcas
  }



  ngOnInit(): void {
    this.onBrandChanged();
  }

  public productsByBrand:Product[] = [];

  onBrandChanged():void{
    this.myForm.get('marca')!.valueChanges
    .pipe(
      switchMap(brand => this.shopService.getProductsByBrand(brand))
    )
    .subscribe(products => {
      this.productsByBrand = products
    });
  }

}
