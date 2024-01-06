import { ChangeDetectionStrategy, Component, EventEmitter, OnInit, Output } from "@angular/core";
import { Observable } from "rxjs";
import { TBoard } from "src/app/common/types/board.type";
import { SudokuService } from "src/app/services/sudoku.service";

@Component({
    selector: 'app-board',
    templateUrl: 'board.component.html',
    styleUrls: ['board.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class BoardComponent {
    @Output() onCompleteGame = new EventEmitter<void>();
    public readonly board$: Observable<TBoard | undefined>;

    constructor(
        private readonly sudokuService: SudokuService
    ) {
        this.board$ = this.sudokuService.newStartingBoard();
    }

    trackByIndex(index: number, col: number) {
        return index;
    }

    setValue(board: TBoard, row: number, col: number, value: number) {
        this.checkValue(board, row, col, +value);
        board[row][col] = +value;
    }

    checkValue(board: TBoard, row: number, col: number, value: number) {
        const checkValue = this.sudokuService.checkValue(board, row, col, value);
        console.log(checkValue)
        if (!checkValue) return false;
        this.checkWin(board);

        return true;
    }

    checkWin(board: TBoard) {
        const checkWin = this.sudokuService.checkWin(board);
        console.log(checkWin)
        if (!checkWin) return;

        this.onCompleteGame.emit()
    }
}