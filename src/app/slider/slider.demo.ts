import {
  Component,
  OnInit,
  ViewChild,
} from '@angular/core';

import { SohoSliderComponent } from '@infor/sohoxi-angular';

@Component({
  selector: 'soho-slider-demo',
  templateUrl: './slider.demo.html',
  styles: [`pre{font-size: 15px}`] // set font size to be larger so pre tag content is more readable
})
export class SliderDemoComponent implements OnInit {
  @ViewChild(SohoSliderComponent) slider: SohoSliderComponent;

  public sliderDisabled: boolean = false;
  public sliderReadOnly: boolean = false;
  public showModel: boolean = false;

  public model = {
    value: '20'
  };

  constructor() {}
  ngOnInit() {}

  onChange(event: SohoSliderEvent) {
    console.log('SliderDemoComponent.onChange: type=' + event.type);
  }

  toggleModel() {
    this.showModel = !this.showModel;
  }

  setReadonly() {
    // TODO: Depends on SOHO-5012. Needs a readonly method for slider.
    this.slider.readonly = true;
    this.sliderReadOnly = this.slider.readonly;
  }

  setDisable() {
    this.slider.disabled = true;
    this.sliderDisabled = this.slider.disabled;
  }

  setEnable() {
    this.slider.disabled = false;
    this.sliderDisabled = this.slider.disabled;
    this.sliderReadOnly = this.slider.readonly;
  }
}