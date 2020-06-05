import { element } from 'protractor';
import { Category } from './../shared/category.model';
import { CategoryService } from './../shared/category.service';
import { Component, OnInit } from '@angular/core';

@Component({
    selector: 'app-category-list',
    templateUrl: './category-list.component.html',
    styleUrls: ['./category-list.component.scss']
})
export class CategoryListComponent implements OnInit {

    categories: Category[] = [];

    constructor(private categoryService: CategoryService) { }

    ngOnInit(): void {
        this.categoryService.getAll().subscribe(
            categories => this.categories = categories,
            error => alert('Erro ao carregar a lista')
        );
    }

    deleteCetegory(category: Category): void {
        const mustDelete = confirm('Deseja realmente exlcuir este item?');

        if (mustDelete) {
            this.categoryService.delete(category.id).subscribe(
                () => this.reloadCategories(category),
                () => alert('Erro ao tentar excluir')
            );
        }
    }

    reloadCategories(categoryExcluded: Category): void {
        this.categories = this.categories.filter(item => item !== categoryExcluded);
    }
}
