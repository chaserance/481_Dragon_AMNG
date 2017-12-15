import { Pipe, PipeTransform } from '@angular/core';
import {HateoasResult} from '../../model/hateoas-result';

@Pipe({
  name: 'toHash'
})
export class ToHashPipe implements PipeTransform {

  transform(value: HateoasResult, args?: any): string {
    return window.btoa(value._links.self.href);
  }

}
