import { Entry } from './../shared/entry.model';
import { EntryService } from './../shared/entry.service';
import { AfterViewChecked, AfterViewInit, Component } from '@angular/core';
import { BaseResourceListComponent } from 'src/app/shared/components/base-resource-list/base-resource-list.component';
import { ptBRInputConfigCalender } from 'src/app/shared/models/input-config';

@Component({
    selector: 'app-entry-list',
    templateUrl: './entry-list.component.html',
    styleUrls: ['./entry-list.component.scss']
})
export class EntryListComponent extends BaseResourceListComponent<Entry> {

    ptBR: any;
    referenceDate: any;
    resourcesCopy: Entry[];

    constructor(private entryService: EntryService) { 
        super(entryService);
        this.ptBR = ptBRInputConfigCalender;
    }

    ngOnInit() {
        super.ngOnInit();
        setTimeout(() => {
            this.copyResources();
        }, 500);
    }

    entriesFilter(): void {
        this.resourcesCopy = this.resources.filter(item => {
            return item.date.substring(3) === this.referenceDate
        });
    }

    clearEntriesFilter(): void {
        this.copyResources();
        this.referenceDate = '';
    }
    
    private copyResources(): void {
        this.resourcesCopy = Object.assign([], this.resources);
    }
}
