import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  imports: [CommonModule],
  standalone: true,
  template: `<div>
    <button (click)="innerHTMLRowsVisible = !innerHTMLRowsVisible">
      Toggle innerHTML rows
    </button>
    <button (click)="bindingRowsVisible = !bindingRowsVisible">
      Toggle binding rows
    </button>

    <div *ngIf="innerHTMLRowsVisible">
      <h2>innerHTML rows</h2>
      <div *ngFor="let row of rows" [innerHTML]="row"></div>
    </div>

    <div *ngIf="bindingRowsVisible">
      <h2>Binding rows</h2>
      <div *ngFor="let row of rows">{{ row }}</div>
    </div>
  </div> `,
})
export class AppComponent {
  innerHTMLRowsVisible = false;
  bindingRowsVisible = false;

  rows: string[] = Array.from({ length: 10000 }).map((x, i) => i.toString());
}
