import { Component, OnInit, AfterViewInit } from '@angular/core';
import { FormGroup, FormControl } from '@angular/forms';

@Component({
  selector: 'soho-dropdown-demo',
  templateUrl: './dropdown-lm.demo.html',
})
export class DropdownLMDemoComponent implements OnInit, AfterViewInit {
  public fieldSpec = {
    AlphaField: {
      bindId: 'AlphaField',
      stateValues: [
        { value: '', label: ' ' },
        { value: 'Y', label: 'Yes' },
        { value: 'N', label: 'No' }
      ]
    },
    NumericField: {
      bindId: 'NumericField',
      stateValues: [
        { value: '0', label: 'Value Zero' },
        { value: '1', label: 'Value One' },
        { value: '2', label: 'Value Two' }
      ]
    },
    PercentField: {
      bindId: 'PercentField',
      stateValues: [
        { value: '', label: ' ' },
        { value: '0.0000', label: '0. 00' },
        { value: '0.0050', label: '0. 50' },
        { value: '0.0100', label: '1. 00' },
        { value: '0.0150', label: '1. 50' },
        { value: '0.0200', label: '2. 00' },
        { value: '0.0250', label: '2. 50' },
        { value: '0.0300', label: '3. 00' },
        { value: '0.0350', label: '3. 50' },
        { value: '0.0400', label: '4. 00' },
        { value: '0.0450', label: '4. 50' },
        { value: '0.0500', label: '5. 00' }
      ]
    },
    SourceField: {
      bindId: 'SourceField',
      stateValues: []
    }
  };
  public model = {};
  public showModel = false;
  public form: FormGroup;

  constructor() {
  }

  ngOnInit() {
    // build model and form group
    const group: {[key: string]: any} = [];
    const keys = Object.keys(this.fieldSpec);
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index];
      this.model[key] = { value: {} };
      group[key] = new FormControl();
    }
    this.form = new FormGroup(group);
  }

  ngAfterViewInit() {
    // update model values as data comes in late
    const keys = Object.keys(this.fieldSpec);
    for (let index = 0; index < keys.length; index++) {
      const key = keys[index];
      const field = this.fieldSpec[key];
      let value = {};
      if (field.hasOwnProperty('stateValues') && field.stateValues.length > 2) {
        value = field.stateValues[2];
      }
      this.model[key].value = value;
    }
  }

  toggleModel() {
    this.showModel = !this.showModel;
  }

  public setSource() {
    return this.source.bind(this);
  }

  public source(response: any, searchTerm: any) {
    const states = [
      { value: 'AK', label: 'Alaska' },
      { value: 'AZ', label: 'Arizona' },
      { value: 'CA', label: 'California' },
      { value: 'CO', label: 'Colorado' },
      { value: 'MN', label: 'Minnesota' },
      { value: 'ND', label: 'North Dakota' },
      { value: 'OR', label: 'Oregon' },
      { value: 'WA', label: 'Washington' },
      { value: 'WY', label: 'Wyoming' }
    ];

    this.fieldSpec.SourceField.stateValues = states;

    response(states);
  }
}