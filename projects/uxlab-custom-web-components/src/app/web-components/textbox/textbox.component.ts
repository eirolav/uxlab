import { Component, Injector, EventEmitter, input, Output, model } from '@angular/core';


@Component({
    selector: "uxlab-ele-textbox2",
    templateUrl: "./textbox.component.html"
})

export class TextboxComponent {
    id = input<string>('');
    label = input<string>('');
    val = model<string>('');
    @Output() valueChange: EventEmitter<any>;
  
    public constructor(private injector: Injector){
        this.valueChange = new EventEmitter<any>();
    }
  
    public onKeyPress(event: any) {
      let target = event.target;
      setTimeout(() => {
        let newValue = event.target.value;
        this.val.update(oldValue => oldValue = newValue)
        this.valueChange.emit(this.val());
      }, 10)
    }
  
    public onChange(event: any){
      let newValue = event.target.value;
      this.val.update(oldValue => oldValue = newValue)
      this.valueChange.emit(this.val());
    }
  
    public onClick(event: Event){
      console.log("I have been clicked: " + this.val());
    }
  }