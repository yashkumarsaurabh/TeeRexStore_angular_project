import { Component } from "@angular/core";
import { Product, ProductService } from "src/services/product.service";
import { FilterBar, ProductFilter } from "src/components/filterBar/filterBar";
import { ProductList } from "src/components/product_list/product_list";
import { SearchBar } from "src/components/searchBar/searchBar";
import { ToolBar } from "src/components/toolBar/toolBar";

@Component({
    selector: 'home',
    standalone: true,
    template: `<tool-bar></tool-bar>
    <search-bar (searchEvent)="onSearch($event)" [applyFilterCallback]="applyFilter.bind(this)"></search-bar>
    <div class="container">
    <filter-bar (searchText)="applyFilter($event)"></filter-bar>
    <product-list [filterProducts]="filteredProducts"></product-list></div>`,
    styleUrls: ['./home.scss'],
    imports: [
        SearchBar,
        ToolBar,
        FilterBar,
        ProductList,
    ],
})
export class Home {
    products: Map<Product, number> = new Map();
    filteredProducts: Product[] = [];

    constructor(private service: ProductService){
        this.service.products.subscribe(data => {
            this.products = data;
            this.filteredProducts = Array.from(this.products.keys());
        })
    }

    onSearch(text:string){
        this.filteredProducts = Array.from(this.products.keys()).filter((product)=>
            product.name.toLowerCase().includes(text.toLowerCase()) ||
            product.color.toLowerCase().includes(text.toLowerCase()) ||
            product.type.toLowerCase().includes(text.toLowerCase())
        );
    }

    applyFilter(productFilter: ProductFilter){
        this.filteredProducts = Array.from(this.products.keys());
        if(productFilter.color.length>0){
            this.filteredProducts = this.filteredProducts.filter((product) => 
                (productFilter.color.indexOf(product.color.toLowerCase()) > -1)
            );
        }
        if(productFilter.gender.length>0){
            this.filteredProducts = this.filteredProducts.filter((product) => 
                (productFilter.gender.indexOf(product.gender.toLowerCase()) > -1)
            );
        }
        if(productFilter.price.length>0){
            this.filteredProducts = this.filteredProducts.filter((product) => {
                let bool:boolean = false;
                for(let x of productFilter.price){
                    bool = (product.price>=x.min && product.price<=x.max);
                    if(bool){
                        return true;
                    }
                }
            return bool;
            }    );
        }
        if(productFilter.type.length>0){
            this.filteredProducts = this.filteredProducts.filter((product) => 
                (productFilter.type.indexOf(product.type.toLowerCase()) > -1)
            );
        }
    }
}