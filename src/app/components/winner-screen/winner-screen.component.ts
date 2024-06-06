import { ChangeDetectionStrategy, Component, EventEmitter, Output } from "@angular/core";

@Component({
  selector: 'app-winner-screen',
  templateUrl: 'winner-screen.component.html',
  styleUrls: ['winner-screen.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})

export class WinnerScreenComponent {
  @Output() onStartNewGame = new EventEmitter<void>();

  public readonly fireworks = new Array(3);
  public readonly parts = new Array(72);
}