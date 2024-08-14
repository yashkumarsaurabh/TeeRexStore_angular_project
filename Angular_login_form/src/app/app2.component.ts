import { Component } from "@angular/core";
import { AppService } from "./app.service";

@Component({
    selector:`app2`,
    standalone: true,
    template: `{{data}}`
})
export class App2{
    data: string | undefined;
    constructor(private service: AppService) {
        this.service.data.subscribe(data => {
            this.data = data;
        })
    }
}