import { Component } from "@angular/core";
import { FilterBar } from "src/filterBar/filterBar";
import { ProductList } from "src/product_list/product_list";
import { SearchBar } from "src/searchBar/searchBar";
import { ToolBar } from "src/toolBar/toolBar";

@Component({
    selector: 'home',
    standalone: true,
    template: `<tool-bar></tool-bar>
    <search-bar></search-bar>
    <filter-bar></filter-bar>
    <product-list></product-list>`,
    styleUrls: ['./home.scss'],
    imports: [
        SearchBar,
        ToolBar,
        FilterBar,
        ProductList,
    ],
})
export class Home { }
