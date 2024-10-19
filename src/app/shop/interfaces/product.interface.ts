export interface Product {
  id: string;
  name: string;
  marca: Marca;
  talla: string;
  color: string;
  precio: number;
  alt_img?: string
}

export enum Marca{
  Nike = "Nike",
  Puma = "Puma",
  Adidas = "Adidas",
  Rebook = "Rebook"
}
