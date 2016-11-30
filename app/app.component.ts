import { Component } from '@angular/core';

enum KeyType {
  Digit,
  Decimal,
  Operator,
  Other
}

@Component({
  selector: 'my-app',
  templateUrl: './app/app.component.html',
})
export class AppComponent {
  private displayString: string;
  private displayNumber: number;
  private terms: string[];
  private lastKeyPressed: KeyType;

  constructor() {
    this.clear();
  }

  private clear() {
    this.setDisplay(0);
    this.terms = [];
    this.lastKeyPressed = KeyType.Other;
  }

  private setDisplay(newValue: number) {
    this.displayNumber = newValue || 0;
    this.displayString = this.displayNumber.toString();
    if (this.displayString.indexOf(".") < 0) {
      this.displayString = this.displayString + ".";
    }
  }
  private isOperator(char: string) {
    switch (char) {
      case "/":
      case "*":
      case "-":
      case "+":
        return true;
      default:
        return false;
    }
  }

  private evaluate() {
    let operation = this.terms.join("");
    if (operation) {
      if (this.isOperator(operation[operation.length - 1])) {
        operation = operation.substr(0, operation.length - 1);
      }
      this.setDisplay(eval(operation));
    }
  }

  public digitClicked(event: MouseEvent) {
    // Note displayString will always contain a decimal point
    let displayValue = this.displayNumber.toString();
    let digit = event.toElement.innerHTML;
    switch (this.lastKeyPressed) {
      case KeyType.Decimal:
        if (displayValue.indexOf(".") < 0) {
          displayValue = `${displayValue}.${digit}`;
        } else {
          displayValue = `${displayValue}${digit}`;
        }
        break;
      case KeyType.Digit:
        displayValue = `${displayValue}${digit}`;
        break;
      case KeyType.Other:
        displayValue = digit.toString();
        this.terms = [];
        break;
      default:
        displayValue = digit.toString();
        break;
    }
    this.setDisplay(parseFloat(displayValue));
    this.lastKeyPressed = KeyType.Digit;
  }

  public decimalClicked() {
    if (this.lastKeyPressed !== KeyType.Decimal && this.lastKeyPressed !== KeyType.Digit) {
      this.setDisplay(0);
    }
    if (this.lastKeyPressed === KeyType.Other) {
      this.terms = [];
    }
    this.lastKeyPressed = KeyType.Decimal;
  }

  public operatorClicked(operator: string) {
    switch (this.lastKeyPressed) {
      case KeyType.Operator:
        this.terms[this.terms.length - 1] = operator;
        break;
      default:
        // Note displayString will always contain a decimal point
        this.terms.push(this.displayNumber.toString());
        this.terms.push(operator);
        break;
    }
    this.evaluate();
    this.lastKeyPressed = KeyType.Operator;
  }

  public clearClicked() {
    this.clear();
  }

  public equalsClicked() {
    if (this.lastKeyPressed === KeyType.Decimal || this.lastKeyPressed === KeyType.Digit) {
      // Note displayString will always contain a decimal point
      this.terms.push(this.displayNumber.toString());
    }
    this.evaluate();
    this.terms = [];
    this.lastKeyPressed = KeyType.Other;
  }
}
