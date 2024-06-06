import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { ArrowComponent } from "./arrow.component";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        ArrowComponent
    ],
    exports: [
        ArrowComponent
    ]
})

export class ArrowModule {}