import {Injectable} from '@angular/core';
import {Validators} from '@angular/forms';
import {UserService} from './user.service';

@Injectable()
export class ValidatorsService {

  static EMAIL_PATTERN = '^(([^<>()\\[\\]\\\\.,;:\\s@"]+(\\.[^<>()\\[\\]\\\\.,;:\\s@"]+)*)|(".+"))@' +
    '((\\[[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\.[0-9]{1,3}\\])|(([a-zA-Z\\-0-9]+\\.)+[a-zA-Z]{2,}))$'
  static PHONE_NUMBER_PATTERN = '^\\(?([0-9]{3})\\)?[-.\\s]?([0-9]{3})[-.\\s]?([0-9]{4})$';

  static PASSWORD_PATTERN_ARRAY = [
    {
      pattern: '(?=.*[a-z])',
      message: 'Lowercase characters'
    },
    {
      pattern: '(?=.*[A-Z])',
      message: 'Uppercase characters'
    },
    {
      pattern: '(?=.*[0-9])',
      message: 'Numbers from 0 - 9'
    },
    {
      pattern: '(?=.*[!@#\\$%\\^&\\*_])',
      message: 'Special character: !,@,#,$,^,&,*,_'
    },
    {
      pattern: '(?=.{8,})',
      message: 'At least 8 characters'
    }
  ];

  constructor() { }

  matchingFields(field1, field2) {
    return form => {
      if (form.controls[field1].value !== form.controls[field2].value) {
        return { mismatchedFields: true};
      }
    };
  }

  emailValidator() {
    return Validators.pattern(ValidatorsService.EMAIL_PATTERN);
  }

  phoneNumberValidator() {
    return Validators.pattern(ValidatorsService.PHONE_NUMBER_PATTERN);
  }

  passwordValidator(control) {
    if (!!!control.value) {
      return null;
    }
    const resultArray = [];
    for (let i = 0; i < ValidatorsService.PASSWORD_PATTERN_ARRAY.length; i++) {
      const cur = ValidatorsService.PASSWORD_PATTERN_ARRAY[i];
      const regex = new RegExp(cur.pattern);
      if (!regex.test(control.value)) {
        resultArray.push(cur.message);
      }
    }
    if (resultArray.length === 0) {
      return null;
    } else {
      return {
        passwordInvalid: resultArray
      };
    }
  }

  createUniqueNameValidator(service: UserService) {
    return control => {
      return new Promise((resolve, reject) => {
        service.isExist(control.value).subscribe(
          data => {
            if (!data.exist) {
              resolve(null);
            } else {
              resolve({uniqueName: true});
            }
          },
          err => {
            resolve(null);
          });
      });
    };
  }
}
