import { Component } from '@angular/core';

export interface Item {
  title: string,
  description: string,
  showDescription: boolean,
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Angular_show_hide_content';

  items: Item[] = [
    { title: 'Item 1', description: 'Description for item 1', showDescription: false },
    { title: 'Item 2', description: 'Description for item 2', showDescription: false },
  ];

  showAllDescription() {
    this.items.map((data)=>data.showDescription=true)
  }

  hideAllDescription() {
    this.items.map((data)=>data.showDescription=false)
  }

  toggleDescription(item: Item) {
    this.items.map((data) => data===item? data.showDescription=!data.showDescription: data);
  }
}
