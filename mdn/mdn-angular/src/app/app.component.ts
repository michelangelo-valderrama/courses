import { Component } from '@angular/core';
import { Item } from './item';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {

  filter: "all" | "active" | "done" = "all"; // \Ö/
  
  allItems = [
    { description: "eat", done: true},
    { description: "sleep", done: false},
    { description: "play", done: false},
    { description: "laught", done: false}
  ];
  
  get items() {
    if (this.filter === "all") {
      return this.allItems;
    }
    return this.allItems.filter(item => {
      return this.filter === "done" ? item.done: !item.done;
    });
  }
  
  addItem(description: string) {
    this.allItems.unshift({
      description,
      done: false
    })
  }

  remove(item: Item) {
    this.allItems.splice(this.allItems.indexOf(item), 1);
  }
}
