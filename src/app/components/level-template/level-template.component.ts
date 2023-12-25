import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: 'app-level-template',
    templateUrl: 'level-template.component.html',
    styleUrls: ['level-template.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class LevelTemplateComponent {}