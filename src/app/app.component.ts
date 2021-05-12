import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'autocomplete';

  items = [
    'João',
    'Sérgio',
    'Daniel',
    'Karol',
    'Renata',
    'Marleth',
    'Ana Paula'
  ];

  selectedItem: string;
  isFiltering: boolean = false;

  setSelectedItem(item: string) {
    console.log(item);
    this.selectedItem = item;
  }
}
