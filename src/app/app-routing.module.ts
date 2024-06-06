import { NgModule } from "@angular/core";
import { RouterModule, Routes } from "@angular/router";

const routes: Routes = [
    {
        path: '',
        loadChildren: () => import('./components/welcome-template/welcome-template.module').then(m => m.WelcomeTemplateModule)
    },
    {
        path: 'game',
        loadChildren: () => import('./components/level-template/level-template.module').then(m => m.LevelTemplateModule)
    }
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})

export class AppRoutingModule {}