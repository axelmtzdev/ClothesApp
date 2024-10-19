import { Pipe, PipeTransform } from '@angular/core';
import { Product } from '../interfaces/product.interface';

@Pipe({
  name:'productImage'
})

export class ProductImagePipe implements PipeTransform {
  transform(product: Product): string {
    if(!product.id && !product.alt_img){
      return 'assets/no-image.png';
    }
    if(product.alt_img) return product.alt_img;

    return `assets/images/${product.id}.webp`;
  }
}
