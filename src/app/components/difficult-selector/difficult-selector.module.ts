import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DifficultSelectorComponent } from "./difficult-selector.component";
import { ArrowModule } from "../arrow/arrow.module";

@NgModule({
    imports: [
        CommonModule,
        ArrowModule
    ],
    declarations: [
        DifficultSelectorComponent
    ],
    exports: [
        DifficultSelectorComponent
    ]
})

export class DifficultSelectorModule {}