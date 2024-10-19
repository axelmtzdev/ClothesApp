import { Component } from '@angular/core';

@Component({
  selector: 'app-layout-page',
  templateUrl: './layout-page.component.html',
  styles: ``
})
export class LayoutPageComponent {

  public sidebarItems = [
    {label: 'Listado', icon: 'list', url: './list'},
    {label: 'Agregar', icon: 'add', url: './new-product'},
    {label: 'Buscar', icon: 'search', url: './search'},
  ];
}
