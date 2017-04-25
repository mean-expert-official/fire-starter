import { ConfigOption } from 'ng-formly/src/core/services/formly.config';

import { FormlyFieldDatePickerComponent } from './formly.field.date-picker';

export const FormlyConfig: ConfigOption = {
  types: [
    {
      name: 'date-picker',
      component: FormlyFieldDatePickerComponent,
      extends: 'input'
    },
  ],
};
