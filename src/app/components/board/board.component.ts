import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: 'app-board',
    templateUrl: 'board.component.html',
    styleUrls: ['board.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class BoardComponent {
    tiles: number[] = new Array(9 * 9);
}