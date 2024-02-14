import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { ItemInterface } from './interfaces/item.interface';
import { DatabaseService } from './services/database.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  @ViewChild('description')
  public inputRef: ElementRef<HTMLInputElement>;

  public title = 'to-do-list';

  public list: ItemInterface[] = [];

  public field: string = '';

  public constructor(public databaseService: DatabaseService) {}

  public ngOnInit(): void {
    this.list = this.databaseService.getItemsAll();
  }

  public newList(): void {
    if (this.list.length > 0) {
      const confirmUser = confirm('Tem certeza que deseja apagar lista atual e criar uma nova?');
      if (confirmUser) {
        this.list = [];
        this.databaseService.deleteAll();
      }
    }
  }

  public observableField(e: any): void {
    this.field = e.target.value;
  }

  public checked(item: ItemInterface): void {
    const selectedItem = this.searchItem(item.id)[0];
    selectedItem.isChecked = !selectedItem.isChecked;
    this.databaseService.save(this.list);
  }

  public set(value: string): void {
    if (value.length < 1) return;
    if (this.isDuplicated(value)) {
      alert('Tarefa já registrada!');
      return;
    }
    this.list.push({
      id: this.databaseService.getItemsAll().length + 1,
      description: value,
      isChecked: false
    });
    this.databaseService.save(this.list);
    this.clearField();
  }

  public isDuplicated(description: string): boolean {
    return this.list.filter((item) => item.description.toUpperCase() === description.toUpperCase()).length > 0 ?
      true : false;
  }

  public delete(id: number): void {
    const confirmUser = confirm('Tem certeza que deseja apagar item da lista?');
    if (confirmUser) {
      const item = this.searchItem(id);
      if (item.length > 0) {
        const index = this.list.indexOf(item[0]);
        if (index > -1) {
          this.list.splice(index, 1);
          this.databaseService.save(this.list);
        }
      }
    }

    if (this.list.length === 0 && this.field.length > 0) {
      this.clearField();
    }
  }

  public searchItem(id: number): ItemInterface[] | [] {
    if (this.list.length < 1) return [];
    return this.list.filter((item) => item.id === id);
  }

  public clearField(): void {
    this.inputRef.nativeElement.value = '';
    this.field = '';
  }
}
