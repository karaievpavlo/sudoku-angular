import { ChangeDetectionStrategy, Component, EventEmitter, Input, OnChanges, Output, SimpleChanges } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { PropertyHelper } from "src/app/common/helpers/property.helper";

@Component({
    selector: 'app-square-tile',
    templateUrl: 'square-tile.component.html',
    styleUrls: ['square-tile.component.scss'],
    changeDetection: ChangeDetectionStrategy.OnPush
})

export class SquareTileComponent implements OnChanges {
    @Output() onChangeValue = new EventEmitter<number>();

    @Input() value: number | undefined;
    @Input() invalid: boolean = false;

    public readonly value$ = new BehaviorSubject<number | undefined>(undefined);

    constructor() {
        
    }

    ngOnChanges(changes: SimpleChanges): void {
        if (PropertyHelper.hasChanges(changes, 'value')) {
            this.value$.next(this.value)
        }
    }

    changeValue(event: any) {
        this.onChangeValue.emit(event?.target?.['value']);
    }

    keyDigitFiltration(event: any) {
        if (event?.code?.includes('Backspace') || event?.code?.includes('Delete')) {
            return true;
        }

        if (event?.target?.value?.length >= 1) {
            return false;
        }

        if (event?.code?.includes('Digit') && !event?.code?.includes('Digit0')) {
            return true;
        }

        return false;
    }
}