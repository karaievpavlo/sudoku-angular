import { CommonModule } from "@angular/common";
import { NgModule } from "@angular/core";
import { WinnerScreenComponent } from "./winner-screen.component";
import { ButtonModule } from "../button/button.module";

@NgModule({
  imports: [
    CommonModule,
    ButtonModule
  ],
  declarations: [
    WinnerScreenComponent
  ],
  exports: [
    WinnerScreenComponent
  ]
})

export class WinnerScreenModule {

}