import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environments } from '../../../environments/environments';
import { Product } from '../interfaces/product.interface';
import { Observable } from 'rxjs';

@Injectable({providedIn: 'root'})
export class ShopService {
  constructor(private http:HttpClient) { }

  private baseUrl:string = environments.baseURL;

  getProducts():Observable<Product[]>{
    return this.http.get<Product[]>(`${this.baseUrl}/products`);
  }

}
