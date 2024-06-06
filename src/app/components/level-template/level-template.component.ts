import { ChangeDetectionStrategy, Component } from "@angular/core";
import { BehaviorSubject, Observable } from "rxjs";
import { Difficult } from "src/app/common/enums/difficult.enum";
import { SudokuService } from "src/app/services/sudoku.service";

@Component({
    selector: 'app-level-template',
    templateUrl: 'level-template.component.html',
    styleUrls: ['level-template.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class LevelTemplateComponent {
    public readonly Difficult = Difficult;
    public readonly currentDifficult$: Observable<Difficult>;
    public readonly isCompleteGame$ = new BehaviorSubject<boolean>(false);

    constructor(
        private readonly sudokuService: SudokuService
    ) {
        this.currentDifficult$ = this.sudokuService.getDifficult();
    }

    startNewGame() {
        this.sudokuService.newStartingBoard();
    }
}