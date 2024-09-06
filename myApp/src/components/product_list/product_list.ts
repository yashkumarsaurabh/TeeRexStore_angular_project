import { CommonModule } from "@angular/common";
import { Component, Input } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { Product, ProductService } from "src/services/product.service";

@Component({
  selector: 'product-list',
  standalone: true,
  templateUrl: './product_list.html',
  styleUrls: ['./product_list.scss'],
  imports: [MatCardModule, MatButtonModule, CommonModule],
})
export class ProductList {
  @Input() filterProducts: Product[] = [];
  errorMessage: string = '';
  constructor(private service: ProductService) { }

  addToCart(product: Product): void {
    const currentMap = this.service.dataSubject.value;
    const currentCount = currentMap.get(product) || 0;
    if (product.quantity > currentCount) {
      this.service.setDataWithFreq(product);
    } else {
      alert('We can not add more than this quantity!')
      return;
    }
  }

  removeFromCart(product: Product): void {
    const currentMap = this.service.dataSubject.value;
    const currentCount = currentMap.get(product) || 0;

    if (currentCount >= 1) {
      currentMap.set(product, currentCount - 1);
    }
    if (currentCount === 1) {
      this.service.productAddedCount.next(this.service.productAddedCount.value - 1);
    }
    this.service.dataSubject.next(currentMap);
  }

  hasProductInCart(product: Product): boolean {
    return (this.service.dataSubject.value.get(product) || 0) > 0;
  }

  productCount(product: Product): number {
    return this.service.dataSubject.value.get(product) || 0;
  }
}
