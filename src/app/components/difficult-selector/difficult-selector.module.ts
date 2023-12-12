import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { DifficultSelectorComponent } from "./difficult-selector.component";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        DifficultSelectorComponent
    ],
    exports: [
        DifficultSelectorComponent
    ]
})

export class DifficultSelectorModule {}