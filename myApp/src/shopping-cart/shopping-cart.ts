import { ChangeDetectorRef, Component, OnInit } from "@angular/core";
import { ToolBar } from "src/toolBar/toolBar";
import { MatListModule } from '@angular/material/list';
import { MatButtonModule } from "@angular/material/button";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatSelectModule } from '@angular/material/select';
import { MatDividerModule } from '@angular/material/divider';
import { Product, ProductService } from "src/app/product.service";
import { CommonModule } from "@angular/common";
import { FormsModule } from "@angular/forms";
import { MatInputModule } from "@angular/material/input";

@Component({
    selector: 'shopping-cart',
    standalone: true,
    templateUrl: './shopping-cart.html',
    styleUrls: ['./shopping-cart.scss'],
    imports: [
        ToolBar,
        CommonModule,
        FormsModule,
        MatListModule,
        MatButtonModule,
        MatFormFieldModule,
        MatSelectModule,
        MatDividerModule,
        MatInputModule,
    ],
})
export class ShoppingCart implements OnInit {
    Totalamount: number = 0;
    shoppingList: Map<Product, number> = new Map();

    constructor(private service: ProductService, private cd: ChangeDetectorRef) { }

    ngOnInit() {
        this.service.products.subscribe(productMap => {
        const filterMap = new Map<Product, number>();
        for (let [key, value] of productMap) {
            if (value > 0) {
            filterMap.set(key, value);
            }
        }
        this.shoppingList = filterMap;
        this.cd.detectChanges();
        });
    }

    getTotalAmount(): number {
        let total: number = 0;
        for (const [product, quantity] of this.shoppingList) {
        total += product.price * quantity;
        }
        return total;
    }

    quantityArray(n: number): Array<number> {
        return Array.from({ length: n }, (_, i) => i + 1);
    }

    onChange(e: Event, product: Product) {
        const target = e.target as HTMLInputElement;
        if (target) {
        const newQuantity = +target.value;
        this.service.updateProductQuantity(product, newQuantity);
        this.cd.detectChanges();
        }
    }

    deleteProduct(product: Product): void {
        this.service.updateProductQuantity(product, 0);
        this.cd.detectChanges();
    }
}