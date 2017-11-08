import { ConfigOption } from 'ng-formly/src/core/services/formly.config';

import { FormlyFieldDatePicker } from './formly.field.date-picker';

export const FormlyConfig: ConfigOption = {
  types: [
    {
      name: 'date-picker',
      component: FormlyFieldDatePicker,
      extends: 'input'
    },
  ],
};
