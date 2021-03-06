import { trigger, style, animate, transition } from '@angular/animations';
import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';

import { MenuService } from '../../../core/services/menu.service';
import { ProductsModel } from '../../../core/models';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
  animations: [
    trigger('fadeInOut', [
      transition(':enter', [
        style({transform: 'scale(0.5)', opacity: 0}),
        animate('.75s ease-out',
          style({transform: 'scale(1)', opacity: 1})
        )
      ]),
      transition(':leave', [
        style({transform: 'scale(1)', opacity: 1, height: '*'}),
        animate('.75s ease-out',
          style({transform: 'scale(0.5)', opacity: 0})
        )
      ]),
    ]),
  ]
})
export class MenuComponent implements OnInit, AfterViewInit {

  private products: Array<ProductsModel>;
  public productList: Array<ProductsModel>;
  public menu = ['breakfast', 'lunch', 'dinner', 'budget-meal', 'buffet'];

  @ViewChild('filters')
  private filters;

  private childrens;

  constructor(private menuService: MenuService) {
  }

  ngOnInit() {
    this.menuService.getProducts()
      .subscribe((products) => {
        this.products = products;
        this.productList = this.products;
      }, (error) => {
        console.log(error);
      });
  }

  ngAfterViewInit(): void {
    this.childrens = this.filters.nativeElement.children;
  }

  public changeMenu(elem) {
    for (let i = 0; i < this.childrens.length; i += 1) {
      this.childrens[i].classList.remove('active');
    }
    elem.classList.add('active');
    if (elem.dataset.filter === '*') {
      return this.productList = this.products;
    }
    this.productList = this.products.filter((product) => {
      return product.category === elem.dataset.filter;
    });
  }

}
