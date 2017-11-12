import {Directive, ElementRef, AfterViewChecked, Input, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appMatchHeight]'
})
export class MatchHeightDirective implements AfterViewChecked {

  @Input()
  appMatchHeight: string;

  constructor(private ref: ElementRef, private render: Renderer2) { }

  @HostListener('window:resize')
  onResize() {
    this.matchHeight(this.ref.nativeElement, this.appMatchHeight);
  }

  ngAfterViewChecked(): void {
    this.matchHeight(this.ref.nativeElement, this.appMatchHeight);
  }

  matchHeight(parent: HTMLElement, className: string): void {
    if (!parent) {
      return;
    }
    const children = parent.getElementsByClassName(className);
    if (!children) {
      return;
    }
    Array.from(children).forEach((x: HTMLElement) => {
      x.style.height = 'initial';
    });

    const itemHeights = Array.from(children).map(x => x.getBoundingClientRect().height);

    const maxHeight = itemHeights.reduce((prev, curr) => {
      return curr > prev ? curr : prev;
    }, 0);
    Array.from(children).forEach((x: HTMLElement) => x.style.height = `${maxHeight}px`);
  }
}
