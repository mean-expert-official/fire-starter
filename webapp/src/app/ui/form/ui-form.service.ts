import { Injectable } from '@angular/core';
import { Validators } from '@angular/forms';

@Injectable()
export class FormService {

  field(type, templateType, key, options: any = {}) {

    const templateOptions = {
      type: templateType,
    };

    const className = options.className || 'col-12';

    const validators = {
      validation: Validators.compose([Validators.required]),
    };

    const toKeys = [
      'label',
      'options',
      'placeholder',
      'addonLeft',
      'addonRight'
    ];

    toKeys.forEach(toKey => {
      if (options[toKey]) {
        templateOptions[toKey] = options[toKey];
      }
    });

    return {
      key,
      type,
      templateOptions,
      validators,
      className
    };
  }

  input(key, options: any = {}) {
    return this.field('input', 'text', key, options);
  }

  email(key, options: any = {}) {
    return this.field('input', 'email', key, options);
  }

  password(key, options: any = {}) {
    return this.field('input', 'password', key, options);
  }

  date(key, options: any = {}) {
    return this.field('date-picker', 'date', key, options);
  }

  textarea(key, options: any = {}) {
    return this.field('textarea', 'text', key, options);
  }

  select(key, options: any = {}) {
    return this.field('select', 'text', key, options);
  }

  checkbox(key, options: any = {}) {
    return this.field('checkbox', 'boolean', key, options);
  }

}
