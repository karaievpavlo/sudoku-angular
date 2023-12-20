import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BoardComponent } from "./board.component";
import { SquareTileModule } from "../square-tile/square-tile.module";

@NgModule({
    imports: [
        CommonModule,
        SquareTileModule
    ],
    declarations: [
        BoardComponent
    ],
    exports: [
        BoardComponent
    ]
})

export class BoardModule {}