import { Directive, ElementRef, EventEmitter, HostListener, Output } from '@angular/core';

@Directive({
  selector: '[appTouched]'
})
export class TouchedDirective {
  @Output() touched = new EventEmitter<void>();

  constructor(private el: ElementRef) { }

  @HostListener('blur')
  onBlur() {
    this.touched.emit(); // Emit an event when the input loses focus
  }
}
