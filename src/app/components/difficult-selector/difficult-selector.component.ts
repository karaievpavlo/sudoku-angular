import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: 'app-difficult-selector',
    templateUrl: 'difficult-selector.component.html',
    styleUrls: ['difficult-selector.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class DifficultSelectorComponent {}