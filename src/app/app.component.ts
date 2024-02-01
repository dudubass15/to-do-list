import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  @ViewChild('description')
  public inputRef: ElementRef<HTMLInputElement>;

  public title = 'to-do-list';

  public list: {id: number, description: string}[] = [];

  public field: string = '';

  public constructor() {}

  public observableField(e: any): void {
    this.field = e.target.value;
  }

  public set(value: string): void {
    if (value.length < 1) return;
    if (this.isDuplicated(value)) {
      alert('Tarefa já registrada!');
      return;
    }
    this.list.push({ id: this.list.length + 1, description: value });
    this.clearField();
  }

  public isDuplicated(description: string): boolean {
    return this.list.filter((item) => item.description.toUpperCase() === description.toUpperCase()).length > 0 ?
      true : false;
  }

  public delete(id: number): void {
    const item = this.searchItem(id);
    if (item.length > 0) {
      const index = this.list.indexOf(item[0]);
      if (index > -1) this.list.splice(index, 1);
    }

    if (this.list.length === 0 && this.field.length > 0) {
      this.clearField();
    }
  }

  public searchItem(id: number): {id: number, description: string}[] | [] {
    if (this.list.length < 1) return [];
    return this.list.filter((item) => item.id === id);
  }

  public clearField(): void {
    this.inputRef.nativeElement.value = '';
    this.field = '';
  }
}
