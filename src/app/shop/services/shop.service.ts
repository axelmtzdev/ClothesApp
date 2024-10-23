import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { Marca, Product } from '../interfaces/product.interface';
import { catchError, map, Observable, of, tap, throwError } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ShopService {
  constructor(private http:HttpClient) { }

  private baseUrl:string = environments.baseURL;

  private _marcas:Marca[] = [Marca.Adidas, Marca.Nike, Marca.Puma, Marca.Rebook]

  get marcas():Marca[]{
    return [...this._marcas]
  }

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
    console.log({product})
    return this.http.patch<Product>(`${this.baseUrl}/products/${product.id}`, product)

  }
  getProductsByBrand(brand: string): Observable<Product[]> {
    const url = `${this.baseUrl}/products?marca=${brand}`;

    return this.http.get<Product[]>(url)  // Cambiado a Observable<Product[]>
      .pipe(
        catchError(this.handleError),
        tap(response => console.log({response}))
      );
  }

  // Método para manejar errores opcionalmente
  private handleError(error: HttpErrorResponse) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Something went wrong; please try again later.'));
  }


  deleteProduct(id:string):Observable<boolean>{
    return this.http.delete(`${this.baseUrl}/products/${id}`)
      .pipe(
        map(resp => true),
        catchError(err => of (false)),
      );
  }
}
