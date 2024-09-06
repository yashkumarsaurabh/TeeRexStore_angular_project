import { Component, EventEmitter, Input, Output, inject } from "@angular/core";
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { FormsModule } from "@angular/forms";
import { MatDialog, MatDialogModule, MatDialogRef } from '@angular/material/dialog';
import { FilterBar, ProductFilter } from "src/components/filterBar/filterBar";

@Component({
    selector: 'search-bar',
    standalone: true,
    templateUrl: './searchBar.html',
    styleUrls: ['./searchBar.scss'],
    imports: [FormsModule, MatFormFieldModule, MatInputModule, MatButtonModule, MatIconModule,
        MatDialogModule,
    ],
})
export class SearchBar {
    searchQuery: string = '';
    @Output() searchEvent = new EventEmitter<string>();

    @Input() applyFilterCallback!: (filter: ProductFilter) => void;

    readonly dialog = inject(MatDialog);

    onSearch() {
        this.searchEvent.emit(this.searchQuery);
    }

    openDialog(): void {
        const dialogRef = this.dialog.open(DialogOverview);

        dialogRef.afterClosed().subscribe((filter: ProductFilter) => {
            if (filter) {
                this.applyFilterCallback(filter);
            }
        });
    }
}

@Component({
    standalone: true,
    selector: 'dialog-overview',
    template: `<div style="margin: 12px">
            <filter-bar (searchText)="onFilterApplied($event)"></filter-bar>
          </div>`,
    imports: [FilterBar],
})
export class DialogOverview {
    readonly dialogRef = inject(MatDialogRef);

    onFilterApplied(filter: ProductFilter) {
        this.dialogRef.close(filter);
    }
}
