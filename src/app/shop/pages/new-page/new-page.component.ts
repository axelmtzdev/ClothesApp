import { Component, OnInit } from '@angular/core';
import { ShopService } from '../../services/shop.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Marca, Product } from '../../interfaces/product.interface';
import { FormControl, FormGroup } from '@angular/forms';
import { filter, switchMap } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../../components/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-new-page',
  templateUrl: './new-page.component.html',
  styles: ``
})
export class NewPageComponent implements OnInit {

  constructor(
    private shopService:ShopService,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private snackBar: MatSnackBar,
    private dialog: MatDialog

  ){}

  public productForm = new FormGroup({
      id:       new FormControl<string>('',{nonNullable:true}),
      name:     new FormControl<string>('', {nonNullable:true}),
      marca:    new FormControl<Marca>(Marca.Adidas),
      talla:    new FormControl(''),
      color:    new FormControl(''),
      precio:   new FormControl(),
      alt_img:  new FormControl('')
  })

  get currentProduct(): Product{
    const product = this.productForm.value as Product;
    return product;
  }


  ngOnInit(): void {
    if(!this.router.url.includes('edit')) return;

    this.activatedRoute.params.pipe(
      switchMap(({id}) => this.shopService.getProductById(id)),
    ).subscribe( product => {
      if(!product) return this.router.navigateByUrl('/');

      this.productForm.reset(product)
      return;
    })
  }

  public marca = [
    {id:'Adidas', desc:'Adidas'},
    {id:'Nike', desc:'Nike'},
    {id:'Rebook', desc:'Rebook'},
    {id:'Puma', desc:'Puma'},
  ]


  onSumbit(){
    if(this.productForm.invalid) return;

    if(this.currentProduct.id){
      this.shopService.updateProduct(this.currentProduct)
        .subscribe( product => {
          this.showSnackbar(`${product.name} actualizado!`);
        });
        return;
    }

    this.shopService.addProduct(this.currentProduct)
        .subscribe( product => {
          this.router.navigate(['/products/edit', product.id])
          this.showSnackbar(`${product.name} registrado!`);
        });

  }


  onDeleteProduct(){
    if(!this.currentProduct.id) throw Error('Product id is required');

    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: this.productForm.value
    });

    dialogRef.afterClosed()
      .pipe(
        filter((result:boolean) => result),
        switchMap(() => this.shopService.deleteProduct(this.currentProduct.id)),
        filter((wasDeleted :boolean) => wasDeleted),
      ).subscribe(() =>{
        this.router.navigate(['/products']);
      });
  }


  showSnackbar(message:string):void{
    this.snackBar.open(message,'Hecho',{
      duration:5000
    })
  }

}
