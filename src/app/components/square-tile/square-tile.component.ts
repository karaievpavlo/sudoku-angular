import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: 'app-square-tile',
    templateUrl: 'square-tile.component.html',
    styleUrls: ['square-tile.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class SquareTileComponent {}