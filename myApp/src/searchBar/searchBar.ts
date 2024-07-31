import { Component, EventEmitter, Output } from "@angular/core";
import {MatInputModule} from '@angular/material/input';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule } from "@angular/forms";

@Component({
    selector: 'search-bar',
    standalone: true,
    templateUrl: './searchBar.html',
    styleUrls: ['./searchBar.scss'],
    imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule],
})
export class SearchBar{
    searchQuery:string = '';
    @Output() searchEvent = new EventEmitter<string>();

    onSearch(){
        this.searchEvent.emit(this.searchQuery);
    }
}