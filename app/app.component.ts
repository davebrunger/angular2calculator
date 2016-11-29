import { Component } from '@angular/core';

@Component({
  selector: 'my-app',
  templateUrl: './app/app.component.html',
})
export class AppComponent {
  private result = 0;
  private display: string;
  private input = "";

  constructor() {
    this.setDisplay(0);
  }

  private setDisplay(newValue: number) {
    if (newValue) {
      this.display = newValue.toString();
      if (this.display.indexOf(".") < 0) {
        this.display = this.display + ".";
      }
    }
    else {
      this.display = "0."
    }
  }

  public digitClicked(event: MouseEvent) {
    this.input = this.input + event.toElement.innerHTML;
    this.setDisplay(parseFloat(this.input));
    event.preventDefault();
  }

  public decimalClicked() {
    if (this.input.indexOf(".") < 0) {
      this.input = this.input + ".";
    }
    this.setDisplay(parseFloat(this.input));
    event.preventDefault();
  }
}
