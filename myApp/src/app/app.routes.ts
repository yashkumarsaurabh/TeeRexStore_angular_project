import { Routes } from '@angular/router';
import { Home } from 'src/home/home';
import { ShoppingCart } from 'src/shopping-cart/shopping-cart';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'shopping-cart', component: ShoppingCart},
];
