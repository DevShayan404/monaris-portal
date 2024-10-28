import { ChangeDetectorRef, Component } from '@angular/core';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { CommonModule } from '@angular/common';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { MerchantService } from '../../../../core/services/merchant/merchant.service';
import { RouterOutlet } from '@angular/router';
@Component({
  selector: 'app-merchant',
  standalone: true,
  imports: [
    CommonModule,
    NzStepsModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzDescriptionsModule,
    NzDividerModule,
    RouterOutlet,
  ],
  templateUrl: './merchant.component.html',
  styleUrl: './merchant.component.css',
})
export class MerchantComponent {

}
