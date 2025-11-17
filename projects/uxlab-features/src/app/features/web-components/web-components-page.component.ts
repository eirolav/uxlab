import { Component, CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

@Component({
  selector: 'app-web-components',
  templateUrl: './web-components-page.component.html',
  styleUrl: './web-components-page.component.scss',
  standalone: false
})
export class WebComponentsPageComponent {

    public props: any = {
        id: "my-element-1",
        label: "First Name",
        value: ""
    }

    public valueEntered: string = '';
    public addressManagerValue: any = {
      streetAddress: "",
      streetAddress2: "",
      city: "",
      state: "",
      zipCode: ""
    }
    public calculation: any = '';

    public constructor(){

    }

    public onValueChanged(event: any){
      this.valueEntered = event.detail;
    }

    public onAdressManagerSubmitted(event: any){
      this.addressManagerValue.streetAddress = event.detail.streetAddress;
      this.addressManagerValue.streetAddress2 = event.detail.streetAddress2;
      this.addressManagerValue.city = event.detail.city;
      this.addressManagerValue.state = event.detail.state;
      this.addressManagerValue.zipCode = event.detail.zipCode;
    }

    public onCalculation(event: any) {
      this.calculation = event.detail.result;
    }
}
