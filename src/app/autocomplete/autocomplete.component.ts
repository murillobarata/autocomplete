import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-autocomplete',
  templateUrl: './autocomplete.component.html',
  styleUrls: ['./autocomplete.component.scss'],
})
export class AutocompleteComponent implements OnInit {
  @Output()
  public onSelectItem = new EventEmitter<string>();

  @Output()
  public onFilteringItem = new EventEmitter<any>();

  @Input()
  public itemList: string[] = [];

  @Input()
  public label: string = '';

  @Input()
  public placeholder: string = '';

  @Input()
  public enableHideAutoComplete: boolean = false;

  @Input()
  public autoCompleteItemLimit: number = 0;

  @Input()
  public disabled: boolean = false;

  public autocompleteItems: string[];
  public showItemsAutoComplete: boolean;
  public itemIdInput: string;
  public componentId: string;
  public indexIdSelect: number;

  constructor() {
    this.itemIdInput = '';
    this.componentId = 'itemIdInput';
  }

  private initialize = () => {
    this.showItemsAutoComplete = false;
    this.indexIdSelect = -1;
    this.autocompleteItems = [];
  };

  ngOnInit(): void {
    this.initialize();
  }

  filterItems(input: string) {
    let filteredItems = this.itemList;
    if (!!input) {
      filteredItems = filteredItems.filter((c: string) =>
        String(c).includes(input)
      );
    } else if (!!this.itemIdInput) {
      filteredItems = filteredItems.filter((c: string) =>
        String(c).includes(this.itemIdInput)
      );
    }
    this.autocompleteItems =
      this.autoCompleteItemLimit > 0
        ? filteredItems.slice(0, this.autoCompleteItemLimit)
        : filteredItems;
    this.showItemsAutoComplete = this.autocompleteItems.length > 0;
    this.indexIdSelect = -1;
    this.onFilteringItem.emit();
  }

  onKeyDown(event: KeyboardEvent) {
    const auxLength = this.autocompleteItems.length - 1;
    switch (event.key) {
      case 'ArrowDown':
        this.indexIdSelect =
          this.indexIdSelect === auxLength ? 0 : this.indexIdSelect + 1;
        break;
      case 'ArrowUp':
        this.indexIdSelect =
          this.indexIdSelect <= 0 ? auxLength : this.indexIdSelect - 1;
        break;
      case 'Enter':
      case 'Tab':
        if (this.indexIdSelect >= 0) {
          this.itemIdInput = this.autocompleteItems[this.indexIdSelect];
          this.selectItem(this.itemIdInput);
        } else {
          if (!!this.itemIdInput && this.itemList.includes(this.itemIdInput)) {
            this.selectItem(this.itemIdInput);
          }
        }
        break;
    }
  }

  selectItem(item: string) {
    this.itemIdInput = item;
    this.initialize();
    this.onSelectItem.emit(item);
  }

  hideAutoComplete() {
    if (this.enableHideAutoComplete) {
      setTimeout(() => {
        this.showItemsAutoComplete = false;
        if (!!this.itemIdInput && this.itemList.includes(this.itemIdInput)) {
          this.selectItem(this.itemIdInput);
        }
      }, 300);
    }
  }
}
