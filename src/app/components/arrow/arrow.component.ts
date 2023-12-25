import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: 'app-arrow',
    templateUrl: 'arrow.component.html',
    styleUrls: ['arrow.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class ArrowComponent {}