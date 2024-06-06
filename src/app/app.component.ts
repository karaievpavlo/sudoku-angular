import { ChangeDetectionStrategy, ChangeDetectorRef, Component } from '@angular/core';
import { LoaderService } from './services/loader.service';
import { tap } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class AppComponent {
  title = 'sudoku-angular';

  public readonly isLoading$;
  
  constructor(
    private readonly loaderService: LoaderService,
    private readonly cdr: ChangeDetectorRef
  ) {
    this.isLoading$ = this.loaderService.isLoading$
      .pipe(
        tap(() => {
          this.cdr.markForCheck();
        })
      );
  }
}
