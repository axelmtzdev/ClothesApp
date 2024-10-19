import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { Product } from '../interfaces/product.interface';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ShopService {
  constructor(private http:HttpClient) { }

  private baseUrl:string = environments.baseURL;

  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.baseUrl}/products`);
  }

  getProductById(id:string):Observable<Product | undefined>{
    return this.http.get<Product>(`${this.baseUrl}/products/${id}`)
    .pipe(
      catchError(() => of(undefined))
    )
  }

  addProduct(product:Product):Observable<Product>{
    return this.http.post<Product>(`${this.baseUrl}/products`,product)
  }

  updateProduct(product:Product): Observable<Product>{
    if(!product) throw Error('Product id is required');
    return this.http.patch<Product>(`${this.baseUrl}/products/${product.id}`, product)

  }

  deleteProduct(id:string):Observable<boolean>{
    return this.http.delete(`${this.baseUrl}/products/${id}`)
      .pipe(
        map(resp => true),
        catchError(err => of (false)),
      );
  }
}
