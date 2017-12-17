import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToHashPipe } from './to-hash.pipe';
import {CapitalizePipe} from './capitalize.pipe';
import { RoleNamePipe } from './role-name.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [CapitalizePipe, ToHashPipe, RoleNamePipe],
    exports: [CapitalizePipe, ToHashPipe, RoleNamePipe]
})
export class SharedPipesModule { }
