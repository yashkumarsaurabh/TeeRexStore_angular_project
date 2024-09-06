import { Component, OnInit } from "@angular/core";
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule} from '@angular/material/button';
import {MatIconModule} from '@angular/material/icon';
import { ActivatedRoute, Router } from "@angular/router";
import {MatBadgeModule} from '@angular/material/badge';
import { ProductService } from "src/services/product.service";

@Component({
    selector: 'tool-bar',
    standalone: true,
    templateUrl: './toolBar.html',
    styleUrls: ['./toolBar.scss'],
    imports: [
        MatToolbarModule,
        MatButtonModule,
        MatIconModule,
        MatBadgeModule,
    ]
})
export class ToolBar implements OnInit{
    productcount: number = 0;
    hidden: boolean = false;
    constructor(private service: ProductService, private router: Router, private route: ActivatedRoute){}

    ngOnInit() {
        this.service.productAddedCount.subscribe(data => this.productcount = data);
    }

    gotoProducts():void {
        this.router.navigate(['/']);  
    }

    gotoCart():void {
        this.router.navigate(['cart']);
    }
}