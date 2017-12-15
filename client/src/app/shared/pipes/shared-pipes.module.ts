import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ToHashPipe } from './to-hash.pipe';
import {CapitalizePipe} from './capitalize.pipe';

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [CapitalizePipe, ToHashPipe],
    exports: [CapitalizePipe, ToHashPipe]
})
export class SharedPipesModule { }
