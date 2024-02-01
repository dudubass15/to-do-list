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

  public list: string[] = [];

  public constructor() {
    this.list.push('Teste');
  }

  public set(description: string): void {
    if (description.length < 1) return;
    this.list.push(description);
    this.inputRef.nativeElement.value = '';
  }
}
