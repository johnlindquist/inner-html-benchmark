import { CommonModule } from '@angular/common';
import { Component, Pipe, PipeTransform, SecurityContext } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

interface PipeOptions {
  postfix: string;
}
@Pipe({
  name: 'sanitize',
  standalone: true,
})
class SanitizePipe implements PipeTransform {
  constructor(private sanitizer: DomSanitizer) {}

  transform(value: string, options: PipeOptions) {
    return (
      (this.sanitizer.sanitize(
        SecurityContext.HTML,
        this.sanitizer.bypassSecurityTrustHtml(value)
      ) || '') + ` ${options.postfix}`
    );
  }
}
@Component({
  selector: 'app-root',
  imports: [CommonModule, SanitizePipe],
  standalone: true,
  template: `<div>
    <div style="display: flex; justify-content: space-between;">
      <!-- <div>
        <button (click)="innerHTMLRowsVisible = !innerHTMLRowsVisible">
          Toggle innerHTML rows
        </button>
        <div *ngIf="innerHTMLRowsVisible">
          <h2>innerHTML rows</h2>
          <div *ngFor="let row of rows" [innerHTML]="row"></div>
        </div>
      </div> -->

      <div>
        <button (click)="bindingRowsVisible = !bindingRowsVisible">
          Toggle Piped
        </button>
        <div *ngIf="bindingRowsVisible">
          <h2>Binding rows</h2>
          <div *ngFor="let row of rows">{{ row | sanitize : pipeOptions }}</div>
        </div>
      </div>

      <div>
        <button (click)="showSanitizedRows()">Show sanitized rows</button>
        <div *ngIf="sanitizedRows.length">
          <h2>Toggle ngOnChanges</h2>
          <div *ngFor="let row of sanitizedRows">{{ row }}</div>
        </div>
      </div>
    </div>
  </div>`,
})
export class AppComponent {
  innerHTMLRowsVisible = false;
  bindingRowsVisible = false;
  pipeOptions = { postfix: ' (sanitized)' };

  rows: string[] = Array.from({ length: 100000 }).map((x, i) => i.toString());
  sanitizedRows: string[] = [];

  constructor(private sanitizer: DomSanitizer) {}

  showSanitizedRows() {
    if (this.sanitizedRows.length) {
      this.sanitizedRows = [];
      return;
    }

    const pipe = new SanitizePipe(this.sanitizer);
    this.sanitizedRows = this.rows.map((row) =>
      pipe.transform(row, this.pipeOptions)
    );
  }
}
