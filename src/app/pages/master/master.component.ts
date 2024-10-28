import { CommonModule, Location } from '@angular/common';
import { Component } from '@angular/core';
import { Router, RouterModule } from '@angular/router';
import { NzAvatarModule } from 'ng-zorro-antd/avatar';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDropDownModule } from 'ng-zorro-antd/dropdown';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';
import { AuthService } from '../../core/services/auth/auth.service';

@Component({
  selector: 'app-master',
  standalone: true,
  imports: [
    RouterModule,
    NzAvatarModule,
    NzDividerModule,
    NzDropDownModule,
    NzCollapseModule,
    NzBreadCrumbModule,
    CommonModule,
  ],
  templateUrl: './master.component.html',
  styleUrl: './master.component.css',
  animations: [
    trigger('slideInOut', [
      transition(':enter', [
        style({ height: '0', opacity: 0 }),
        animate('100ms ease-in', style({ height: '*', opacity: 1 })),
      ]),
      transition(':leave', [
        animate('100ms ease-out', style({ height: '0', opacity: 0 })),
      ]),
    ]),
  ],
})
export class MasterComponent {
  sidebarLinks: any[] = [
    {
      id: 1,
      name: 'Dashboard',
      icon: 'bi bi-grid me-2',
    },
    {
      id: 2,
      name: 'Bearer Token',
      icon: 'bi bi-coin me-2',
    },
    {
      id: 3,
      name: 'Merchant',
      icon: 'bi-person-workspace me-2',
      children: [
        {
          id: 1,
          name: 'Add New',
        },
        {
          id: 2,
          name: 'View All',
        },
      ],
    },
    {
      id: 4,
      name: 'Terminal',
      icon: 'bi bi-boxes me-2',
      children: [
        {
          id: 1,
          name: 'Add Order',
        },
        {
          id: 2,
          name: 'View Order',
        },
      ],
    },
    {
      id: 5,
      name: 'Account Maintenance',
      icon: 'bi-tools me-2',
    },
    {
      id: 6,
      name: 'Configuration',
      icon: 'bi-gear-wide-connected me-2',
    },
  ];
  breadCrumbaName!: string | null;
  activeIndex: number = 0;
  activeChildIndex: number | null = null;
  childrenCollapse: boolean[] = [];
  ChildBreadCrumbName!: string | null;
  constructor(
    private router: Router,
    private location: Location,
    private authService: AuthService
  ) {
    this.childrenCollapse = this.sidebarLinks.map((link) =>
      link.children ? false : true
    );
  }

  ngOnInit() {
    const url = this.location.path();
    this.setActiveLinkByUrl(url);
  }
  setActiveIndex(index: number, data: any) {
    const previousActiveIndex = this.activeIndex;
    this.activeIndex = index;
    this.childrenCollapse = this.sidebarLinks.map((link) =>
      link.children ? false : true
    );

    if (data.children) {
      this.childrenCollapse[index] = !this.childrenCollapse[index];
      if (previousActiveIndex !== index) {
        this.activeChildIndex = null;
        // this.ChildBreadCrumbName = null;
      }
    } else {
      this.activeChildIndex = null;
      this.ChildBreadCrumbName = null;
      this.navigateToRoute(data);
    }
  }

  navigateToRoute(link: any) {
    switch (link.name) {
      case 'Dashboard':
        this.router.navigate(['portal/dashboard']);
        this.breadCrumbaName = null;
        break;
      case 'Bearer Token':
        this.router.navigate(['portal/bearer-token']);
        this.breadCrumbaName = link.name;
        break;
      // case 'Merchant':

      //   break;
      // case 'Terminal':
      //   this.router.navigate(['portal/terminal']);
      //   this.breadCrumbaName = link.name;
      //   break;
      case 'Account Maintenance':
        this.router.navigate(['portal/account-maintenance']);
        this.breadCrumbaName = link.name;
        break;
      case 'Configuration':
        this.router.navigate(['portal/configuration']);
        this.breadCrumbaName = link.name;
        break;
      default:
        this.breadCrumbaName = null;
        break;
    }
  }
  navigateToChildRoute(child: any, index: number) {
    this.activeChildIndex = index; // Set the active child index
    switch (child.name) {
      case 'Add New':
        this.router.navigate(['portal/merchant/add-new']);
        this.breadCrumbaName = 'Merchant';
        this.ChildBreadCrumbName = child.name;
        break;
      case 'View All':
        this.router.navigate(['portal/merchant/view-all']);
        this.breadCrumbaName = 'Merchant';
        this.ChildBreadCrumbName = child.name;
        break;
      case 'Add Order':
        this.router.navigate(['portal/terminal/add-order']);
        this.breadCrumbaName = 'Terminal';
        this.ChildBreadCrumbName = child.name;
        break;
      case 'View Order':
        this.router.navigate(['portal/terminal/view-order']);
        this.breadCrumbaName = 'Terminal';
        this.ChildBreadCrumbName = child.name;
        break;
      default:
        break;
    }
  }

  setActiveLinkByUrl(url: string) {
    switch (url) {
      case '/portal/dashboard':
        this.activeIndex = 0;
        this.breadCrumbaName = null;
        break;
      case '/portal/bearer-token':
        this.activeIndex = 1;
        this.breadCrumbaName = 'Bearer Token';
        break;
      case '/portal/terminal':
        this.activeIndex = 3;
        this.breadCrumbaName = 'Terminal';
        break;
      case '/portal/account-maintenance':
        this.activeIndex = 4;
        this.breadCrumbaName = 'Account Maintenance';
        break;
      case '/portal/configuration':
        this.activeIndex = 5;
        this.breadCrumbaName = 'Configuration';
        break;
      // ------children------
      case '/portal/merchant/add-new':
        this.activeIndex = 2;
        this.childrenCollapse[2] = true;
        this.activeChildIndex = 0;
        this.breadCrumbaName = 'Merchant';
        this.ChildBreadCrumbName = 'Add New';
        break;
      case '/portal/merchant/view-all':
        this.activeIndex = 2;
        this.childrenCollapse[2] = true;
        this.activeChildIndex = 1;
        this.breadCrumbaName = 'Merchant';
        this.ChildBreadCrumbName = 'View All';
        break;
      case '/portal/terminal/add-order':
        this.activeIndex = 3;
        this.childrenCollapse[3] = true;
        this.activeChildIndex = 0;
        this.breadCrumbaName = 'Terminal';
        this.ChildBreadCrumbName = 'Add Order';
        break;
      case '/portal/terminal/view-order':
        this.activeIndex = 3;
        this.childrenCollapse[3] = true;
        this.activeChildIndex = 1;
        this.breadCrumbaName = 'Terminal';
        this.ChildBreadCrumbName = 'View Order';
        break;
      // ------children------

      default:
        this.activeIndex = 0;
        break;
    }
  }

  logout() {
    this.authService.logout();
    localStorage.removeItem('user');
    this.router.navigate(['monaris/login']);
  }
}
