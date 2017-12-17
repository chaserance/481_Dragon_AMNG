import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'roleName'
})
export class RoleNamePipe implements PipeTransform {

  prefix = 'ROLE_';

  transform(value: string, args?: any): any {
    return value.substr(this.prefix.length);
  }

}
