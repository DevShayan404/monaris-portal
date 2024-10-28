import { Routes } from '@angular/router';
import { authGuard, LoginAuthGuard } from './core/auth/auth.guard';

export const routes: Routes = [
  {
    path: 'portal',
    canActivate: [authGuard],
    loadComponent: () =>
      import('./pages/master/master.component').then((c) => c.MasterComponent),
    children: [
      {
        path: 'dashboard',
        loadComponent: () =>
          import('./pages/master/pages/dashboard/dashboard.component').then(
            (c) => c.DashboardComponent
          ),
      },
      {
        path: 'bearer-token',
        loadComponent: () =>
          import(
            './pages/master/pages/bearer-token/bearer-token.component'
          ).then((c) => c.BearerTokenComponent),
      },
      {
        path: 'merchant',
        loadComponent: () =>
          import('./pages/master/pages/merchant/merchant.component').then(
            (c) => c.MerchantComponent
          ),
        children: [
          {
            path: 'add-new',
            loadComponent: () =>
              import(
                './pages/master/pages/merchant/add-merchant/add-merchant.component'
              ).then((c) => c.AddMerchantComponent),
          },
          {
            path: 'view-all',
            loadComponent: () =>
              import(
                './pages/master/pages/merchant/view-merchants/view-merchants.component'
              ).then((c) => c.ViewMerchantsComponent),
          },
        ],
      },
      {
        path: 'terminal',
        loadComponent: () =>
          import('./pages/master/pages/terminal/terminal.component').then(
            (c) => c.TerminalComponent
          ),
        children: [
          {
            path: 'add-order',
            loadComponent: () =>
              import(
                './pages/master/pages/terminal/add-order/add-order.component'
              ).then((c) => c.AddOrderComponent),
          },
          {
            path: 'view-order',
            loadComponent: () =>
              import(
                './pages/master/pages/terminal/view-order/view-order.component'
              ).then((c) => c.ViewOrderComponent),
          },
        ],
      },
      {
        path: 'account-maintenance',
        loadComponent: () =>
          import(
            './pages/master/pages/account-maintenance/account-maintenance.component'
          ).then((c) => c.AccountMaintenanceComponent),
      },
      {
        path: 'configuration',
        loadComponent: () =>
          import(
            './pages/master/pages/configuration/configuration.component'
          ).then((c) => c.ConfigurationComponent),
      },
    ],
  },
  {
    path: 'monaris',
    canActivate: [LoginAuthGuard],
    loadComponent: () =>
      import('./pages/authentication/authentication.component').then(
        (c) => c.AuthenticationComponent
      ),
    children: [
      {
        path: 'login',
        loadComponent: () =>
          import('./pages/authentication/login/login.component').then(
            (c) => c.LoginComponent
          ),
      },
    ],
  },
  {
    path: '',
    redirectTo: 'monaris/login',
    pathMatch: 'full',
  },
];
