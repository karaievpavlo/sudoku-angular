import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { SquareTileComponent } from "./square-tile.component";

@NgModule({
    imports: [
        CommonModule
    ],
    declarations: [
        SquareTileComponent
    ],
    exports: [
        SquareTileComponent
    ]
})

export class SquareTileModule {}