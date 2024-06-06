import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { WelcomeTemplateComponent } from "./welcome-template.component";
import { ButtonModule } from "../button/button.module";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path: '',
        component: WelcomeTemplateComponent
    }
];

@NgModule({
    imports: [
        CommonModule,
        RouterModule.forChild(routes),
        ButtonModule
    ],
    declarations: [
        WelcomeTemplateComponent
    ],
    exports: [
        WelcomeTemplateComponent
    ]
})

export class WelcomeTemplateModule {}