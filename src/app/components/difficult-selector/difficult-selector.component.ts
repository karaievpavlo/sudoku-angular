import { ChangeDetectionStrategy, Component } from "@angular/core";
import { Observable } from "rxjs";
import { Difficult } from "src/app/common/enums/difficult.enum";
import { SudokuService } from "src/app/services/sudoku.service";

@Component({
    selector: 'app-difficult-selector',
    templateUrl: 'difficult-selector.component.html',
    styleUrls: ['difficult-selector.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class DifficultSelectorComponent {
    public readonly Difficult = Difficult;
    public readonly currentDifficult$: Observable<Difficult>;

    constructor(
        private readonly sudokuService: SudokuService
    ) {
        this.currentDifficult$ = this.sudokuService.getDifficult();
    }

    changeDifficult(difficult: Difficult) {
        this.sudokuService.setDifficult(difficult);
    }
}