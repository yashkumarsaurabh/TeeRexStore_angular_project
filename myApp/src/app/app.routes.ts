import { Routes } from '@angular/router';
import { Home } from 'src/components/home/home';
import { ShoppingCart } from 'src/components/shopping-cart/shopping-cart';

export const routes: Routes = [
    {path: '', component: Home},
    {path: 'cart', component: ShoppingCart},
];
