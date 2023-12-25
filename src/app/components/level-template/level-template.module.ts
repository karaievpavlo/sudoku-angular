import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { LevelTemplateComponent } from "./level-template.component";
import { BoardModule } from "../board/board.module";
import { RouterModule, Routes } from "@angular/router";
import { DifficultSelectorModule } from "../difficult-selector/difficult-selector.module";

const routes: Routes = [
    {
        path: '',
        component: LevelTemplateComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        BoardModule,
        DifficultSelectorModule
    ],
    declarations: [
        LevelTemplateComponent
    ],
    exports: [
        LevelTemplateComponent
    ]
})

export class LevelTemplateModule {}