import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LevelTemplateComponent } from "./level-template.component";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        LevelTemplateComponent
    ],
    exports: [
        LevelTemplateComponent
    ]
})

export class LevelTemplateModule {}