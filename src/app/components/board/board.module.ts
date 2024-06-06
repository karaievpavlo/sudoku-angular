import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { BoardComponent } from "./board.component";
import { SquareTileModule } from "../square-tile/square-tile.module";
import { SudokuService } from "src/app/services/sudoku.service";

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
    ],
    providers: [
        SudokuService
    ]
})

export class BoardModule {}