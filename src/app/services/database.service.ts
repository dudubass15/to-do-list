import { Injectable } from '@angular/core';
import { ItemInterface } from '../interfaces/item.interface';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private readonly label = '_data';

  private readonly _localStorage = localStorage;

  public getItemsAll(): ItemInterface[] {
    return JSON.parse(this._localStorage.getItem(this.label) as string) as ItemInterface[] ?? [];
  }

  public save(values: ItemInterface[]): void {
    const data = JSON.stringify(values);
    this._localStorage.setItem(this.label, data);
  }

  public deleteAll(): void {
    this._localStorage.clear();
  }
}
