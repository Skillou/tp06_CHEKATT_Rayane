import { Directive, ElementRef, HostListener, Input } from '@angular/core';

@Directive({
  selector: '[appDirClient]'
})
export class DirClientDirective {

  // @Input() appDirClient: string = '#FF8B8B';
  @Input() length: String = '';

  constructor(private el: ElementRef) {
    
    // this.el.nativeElement.style.backgroundColor = this.appDirClient;

    el.nativeElement.onkeypress = (event: KeyboardEvent) => {
      if (this.el.nativeElement.value.length < this.length) {
        el.nativeElement.style.backgroundColor = 'FF8B8B';
        return;
      }
      el.nativeElement.style.backgroundColor = 'white';
      if (
        event.altKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.key.charCodeAt(0) < 48 ||
        event.key.charCodeAt(0) > 57 ||
        this.el.nativeElement.value.length >= this.length
      ) {
        event.preventDefault();
        return;
      }
    }
  }
}