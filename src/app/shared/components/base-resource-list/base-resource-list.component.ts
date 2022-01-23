import { BaseResouceService } from 'src/app/shared/services/base-resource.service';
import { OnInit } from '@angular/core';
import { BaseResourceModel } from 'src/app/shared/models/base-resource.model';

export abstract class BaseResourceListComponent<T extends BaseResourceModel> implements OnInit {

    resources: T[] = [];

    constructor(protected baseResourceService: BaseResouceService<T>) { }

    ngOnInit(): void {
        this.baseResourceService.getAll().subscribe(
            resources => this.resources = resources.sort((a, b) => b.id - a.id),
            error => alert('Erro ao carregar a lista')
        );
    }

    deleteResource(resource: T): void {
        const mustDelete = confirm('Deseja realmente exlcuir este item?');

        if (mustDelete) {
            this.baseResourceService.delete(resource.id).subscribe(
                () => this.reloadResource(resource),
                () => alert('Erro ao tentar excluir')
            );
        }
    }

    protected reloadResource(resourceExcluded: T): void {
        this.resources = this.resources.filter(item => item !== resourceExcluded);
    }
}
