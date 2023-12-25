import { ChangeDetectionStrategy, Component } from "@angular/core";

@Component({
    selector: 'app-welcome-template',
    templateUrl: 'welcome-template.component.html',
    styleUrls: ['./welcome-template.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class WelcomeTemplateComponent {}