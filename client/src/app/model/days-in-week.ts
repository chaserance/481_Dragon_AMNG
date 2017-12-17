export class DaysInWeek {

  placeHolder = 'O';
  empty = '_';

  days: boolean[];

  constructor(code: string) {
    this.decode(code);
  }

  encode(): string {
    let code = '';
    this.days.forEach(b => code += (b ? this.placeHolder : this.empty))
    return code;
  }

  decode(str: string): void {
    const arr = [];
    for (let i = 0; i < str.length; i++) {
      arr[i] = str.charAt(i) !== this.empty;
    }
    this.days = arr;
  }
}
