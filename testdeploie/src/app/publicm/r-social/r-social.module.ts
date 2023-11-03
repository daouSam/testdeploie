import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RSocialComponent } from './r-social.component';

@NgModule({

    declarations: [
        RSocialComponent
    ],
    imports: [
        CommonModule
    ],
    exports: [RSocialComponent]
})
export class RsocialModule { }