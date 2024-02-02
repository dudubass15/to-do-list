import { Injectable } from '@angular/core';
import { ItemInterface } from '../interfaces/item.interface';

@Injectable({
  providedIn: 'root',
})
export class DatabaseService {
  private readonly label = '_data';

  private readonly _localStorage = localStorage;

  constructor() {}

  public save(values: ItemInterface[]): void {
    const data = JSON.stringify(values);
    this._localStorage.setItem(this.label, data);
  }
}
