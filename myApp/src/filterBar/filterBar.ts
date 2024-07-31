import { CommonModule } from "@angular/common";
import { Component, EventEmitter, Output } from "@angular/core";
import { MatButtonModule } from "@angular/material/button";
import {MatCheckboxChange, MatCheckboxModule} from '@angular/material/checkbox';

export interface priceRange {
    min:number,
    max:number,
}

export interface ProductFilter {
    color: string[],
    gender: string[],
    price: priceRange[],
    type: string[],
}

@Component({
    selector: 'filter-bar',
    standalone: true,
    templateUrl: './filterBar.html',
    styleUrls: ['./filterBar.scss'],
    imports: [CommonModule, MatCheckboxModule, MatButtonModule],
})
export class FilterBar {
    colors:string[] = ['Red', 'Blue', 'Green'];
    genders:string[] = ['Men','Women'];
    prices:string[] = ['Rs 0-250','Rs 251-450','Rs 450-10000'];
    types:string[] = ['Polo','Hoodie','Basic'];

    @Output() searchText = new EventEmitter<ProductFilter>();

    productFilters:ProductFilter = {
        color: [],
        gender: [],
        price: [],
        type: []
    };

    colorToggle(e:MatCheckboxChange){
        if(e.checked){
            this.productFilters.color.push(e.source.value.toLowerCase());
        } else {
            let index = this.productFilters.color.indexOf(e.source.value.toLowerCase());
            if(index>-1){
                this.productFilters.color.splice(index,1);
            }
        }
        console.log(this.productFilters);
    }

    genderToggle(e:MatCheckboxChange){
        if(e.checked){
            this.productFilters.gender.push(e.source.value.toLowerCase());
        } else {
            let index = this.productFilters.gender.indexOf(e.source.value.toLowerCase());
            if(index>-1){
                this.productFilters.gender.splice(index,1);
            }
        }
    }

    priceToggle(e:MatCheckboxChange){
        let obj = {min:0,max:0};
        let splitArr = e.source.value.split(/[\s-]+/);
            obj.min = +splitArr[1];
            obj.max = +splitArr[2];
        if(e.checked){
            this.productFilters.price.push(obj);
        } else {
            let index = this.productFilters.price.findIndex((element)=> element.min === obj.min);
            if(index>-1){
                this.productFilters.price.splice(index,1);
            }
        }
    }

    typeToggle(e:MatCheckboxChange){
        if(e.checked){
            this.productFilters.type.push(e.source.value.toLowerCase());
        } else {
            let index = this.productFilters.type.indexOf(e.source.value.toLowerCase());
            if(index>-1){
                this.productFilters.type.splice(index,1);
            }
        }
    }

    applyFilter(){
        this.searchText.emit(this.productFilters);
    }
}