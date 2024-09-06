import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, tap } from 'rxjs';

export interface Product {
  id: number,
  imageURL: string,
  name: string,
  type: string,
  price: number,
  currency: string,
  color: string,
  gender: string,
  quantity: number
}

@Injectable({
  providedIn: 'root'
})
export class ProductService {
  dataSubject = new BehaviorSubject<Map<Product, number>>(new Map());
  products: Observable<Map<Product, number>> = this.dataSubject.asObservable();
  productAddedCount = new BehaviorSubject<number>(0);

  constructor(private http: HttpClient) {
    this.fetchCartProducts();
  }

  fetchCartProducts(): void {
    this.http.get<Product[]>('https://geektrust.s3.ap-southeast-1.amazonaws.com/coding-problems/shopping-cart/catalogue.json').pipe(
      tap((products: Product[]) => {
        const productFrequencyMap = new Map<Product, number>();
        products.forEach((product: Product) => {
          productFrequencyMap.set(product, 0);
        });
        this.dataSubject.next(productFrequencyMap);
      })
    ).subscribe();
  }

  setDataWithFreq(product: Product): void {
    const currentMap = this.dataSubject.value;
    let currentCount = currentMap.get(product) || 0;
    if (currentCount === 0) {
      this.productAddedCount.next(this.productAddedCount.value + 1);
    }
    currentCount++;
    currentMap.set(product, currentCount);
    this.dataSubject.next(currentMap);
  }

  updateProductQuantity(product: Product, quantity: number): void {
    const currentMap = this.dataSubject.value;
    if (quantity > 0) {
      currentMap.set(product, quantity);
    } else {
      currentMap.set(product, 0);
      this.productAddedCount.next(this.productAddedCount.value - 1);
    }
    this.dataSubject.next(currentMap);
  }
}
