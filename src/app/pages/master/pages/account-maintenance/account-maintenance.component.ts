import { Component } from '@angular/core';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { CommonModule } from '@angular/common';
import { FormControl, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzBreadCrumbModule } from 'ng-zorro-antd/breadcrumb';

@Component({
  selector: 'app-account-maintenance',
  standalone: true,
  imports: [
    CommonModule,
    NzStepsModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzBreadCrumbModule,
  ],
  templateUrl: './account-maintenance.component.html',
  styleUrl: './account-maintenance.component.css',
})
export class AccountMaintenanceComponent {
  current = 0;
  listOfOption = ['Option 01', 'Option 02'];
}
