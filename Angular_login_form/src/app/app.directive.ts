import { Directive, ElementRef } from "@angular/core";

@Directive({
    selector: '[highlight]'
})
export class HighLight{
    constructor(ele: ElementRef) {
        // ele.nativeElement.
    }
}