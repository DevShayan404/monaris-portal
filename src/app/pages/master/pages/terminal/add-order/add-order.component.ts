import { Component } from '@angular/core';
import { RouterModule } from '@angular/router';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { CommonModule } from '@angular/common';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { TerminalService } from '../../../../../core/services/terminal/terminal.service';
import { BearerTokenService } from '../../../../../core/services/bearer-token/bearer-token.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-add-order',
  standalone: true,
  imports: [
    RouterModule,
    NzTableModule,
    NzInputModule,
    NzDividerModule,
    CommonModule,
    NzStepsModule,
    NzSelectModule,
    ReactiveFormsModule,
    NzDescriptionsModule,
  ],
  templateUrl: './add-order.component.html',
  styleUrl: './add-order.component.css',
})
export class AddOrderComponent {
  cardPlan: FormGroup = new FormGroup({
    merchantId: new FormControl('', [Validators.required]),
    cnpVarConfigCode: new FormControl('', [Validators.required]),
    calculationMethod: new FormControl('', [Validators.required]),
    mdrType: new FormControl('', [Validators.required]),
    currency: new FormControl('', [Validators.required]),
  });
  cardRate: FormGroup = new FormGroup({
    visaMdr: new FormControl('', [Validators.required]),
    visaTxn: new FormControl('', [Validators.required]),
    visaDebitMdr: new FormControl('', [Validators.required]),
    visaDebitTxn: new FormControl('', [Validators.required]),
    masterMdr: new FormControl('', [Validators.required]),
    masterTxn: new FormControl('', [Validators.required]),
    masterDebitMdr: new FormControl('', [Validators.required]),
    masterDebitTxn: new FormControl('', [Validators.required]),
    interacMdr: new FormControl('', [Validators.required]),
    interacTxn: new FormControl('', [Validators.required]),
    discoverMdr: new FormControl('', [Validators.required]),
    discoverTxn: new FormControl('', [Validators.required]),
    unionPayMdr: new FormControl('', [Validators.required]),
    unionPayTxn: new FormControl('', [Validators.required]),
    amexMdr: new FormControl('', [Validators.required]),
    amexTxn: new FormControl('', [Validators.required]),
  });
  productFee: FormGroup = new FormGroup({
    base: new FormControl('', [Validators.required]),
    setup: new FormControl('', [Validators.required]),
    transaction: new FormControl('', [Validators.required]),
    recurring: new FormControl('', [Validators.required]),
  });
  firstFormCurrent = 0;
  dropdownList: any;
  spinner: boolean = false;
  constructor(
    private service: TerminalService,
    private bearerService: BearerTokenService,
    private toastr: ToastrService
  ) {}
  ngOnInit(): void {
    this.getDropdownList();
  }
  // ----------------Fetch Apis-----------------
  getDropdownList() {
    this.service.getDropdownList().subscribe({
      next: (res) => {
        this.dropdownList = res;
      },
    });
  }

  // ----------------Next/Pre case-----------------
  firstFormPre(): void {
    this.firstFormCurrent -= 1;
  }
  firstFormNext(): void {
    switch (this.firstFormCurrent) {
      case 0:
        this.onSubmitCardPlan();
        break;
      case 1:
        this.onSubmitCardRate();
        break;
      default:
        break;
    }
  }
  // ----------------Form submission methods-----------------
  onSubmitCardPlan() {
    if (this.cardPlan.valid) {
      this.firstFormCurrent += 1;
    } else {
      Object.keys(this.cardPlan.controls).forEach((controlName) => {
        const control = this.cardPlan.get(controlName);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }
  onSubmitCardRate() {
    if (this.cardRate.valid) {
      this.firstFormCurrent += 1;
    } else {
      Object.keys(this.cardRate.controls).forEach((controlName) => {
        const control = this.cardRate.get(controlName);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }
  // ----------------Final form Submission-----------------
  onSubmitProductFee() {
    if (this.productFee.valid) {
      this.spinner = true;
      this.bearerService
        .getBearerToken(
          'client_credentials',
          'ab21c515-1f00-42b5-9630-33c2a7c97547',
          'F2O8Q~mhe4c4hiT5dYbMi7WikRB4z8DWODfPzb3E',
          'ab21c515-1f00-42b5-9630-33c2a7c97547/.default'
        )
        .subscribe({
          next: (res) => {
            this.service
              .postOrder({
                merchantDetails: {
                  merchant: {
                    merchantId: this.cardPlan.value.merchantId,
                  },
                },
                cardplans: {
                  calculationMethod: this.cardPlan.value.calculationMethod,
                  mdrType: this.cardPlan.value.mdrType,
                  currency: this.cardPlan.value.currency,
                  visa: {
                    transactions: [
                      {
                        mdr: +this.cardRate.value.visaMdr,
                        txn: +this.cardRate.value.visaTxn,
                      },
                    ],
                  },
                  visadebit: {
                    transactions: [
                      {
                        mdr: +this.cardRate.value.visaDebitMdr,
                        txn: +this.cardRate.value.visaDebitTxn,
                      },
                    ],
                  },
                  mastercard: {
                    transactions: [
                      {
                        mdr: +this.cardRate.value.masterMdr,
                        txn: +this.cardRate.value.masterTxn,
                      },
                    ],
                  },
                  mastercarddebit: {
                    transactions: [
                      {
                        mdr: +this.cardRate.value.masterDebitMdr,
                        txn: +this.cardRate.value.masterDebitTxn,
                      },
                    ],
                  },
                  interac: {
                    transactions: [
                      {
                        mdr: +this.cardRate.value.interacMdr,
                        txn: +this.cardRate.value.interacTxn,
                      },
                    ],
                  },
                  discover: {
                    transactions: [
                      {
                        mdr: +this.cardRate.value.discoverMdr,
                        txn: +this.cardRate.value.discoverTxn,
                      },
                    ],
                  },
                  unionpay: {
                    transactions: [
                      {
                        mdr: +this.cardRate.value.unionPayMdr,
                        txn: +this.cardRate.value.unionPayTxn,
                      },
                    ],
                  },
                  amex: {
                    transactions: [
                      {
                        mdr: +this.cardRate.value.amexMdr,
                        txn: +this.cardRate.value.amexTxn,
                      },
                    ],
                  },
                },
                products: {
                  monerisGateway: {
                    fees: {
                      base: {
                        unitPrice: +this.productFee.value.base,
                      },
                      setup: {
                        unitPrice: +this.productFee.value.setup,
                      },
                      transaction: {
                        unitPrice: +this.productFee.value.transaction,
                      },
                      recurring: {
                        unitPrice: +this.productFee.value.recurring,
                      },
                    },
                    cnpVarConfigCode: this.cardPlan.value.cnpVarConfigCode,
                  },
                },
              })
              .subscribe({
                next: (res) => {
                  console.log(res);
                  this.toastr.success(res?.response?.orderId, 'Order Id');
                  this.spinner = false;
                  this.firstFormCurrent = 0;
                  this.cardPlan.reset();
                  this.cardRate.reset();
                  this.productFee.reset();
                },
                error: (err) => {
                  console.log(err);

                  this.spinner = false;
                  this.firstFormCurrent = 0;
                  this.toastr.error('Try Again', 'Error');
                },
              });
          },
        });
    } else {
      Object.keys(this.productFee.controls).forEach((controlName) => {
        const control = this.productFee.get(controlName);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }
  // ----------------Form pattern validation-----------------
  formatInputcardRate(event: Event, controlName: string) {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, '');
    let numericValue = parseInt(value, 10) || 0;

    if (numericValue > 999) {
      numericValue = Math.floor(numericValue / 10);
    }

    const formattedValue = (numericValue / 100).toFixed(2);

    this.cardRate.get(controlName)?.setValue(formattedValue);
    input.value = formattedValue;

    input.maxLength = 5;
  }
  formatInputProductFee(event: Event, controlName: string) {
    const input = event.target as HTMLInputElement;
    const value = input.value.replace(/\D/g, '');
    let numericValue = parseInt(value, 10) || 0;

    const formattedValue = (numericValue / 100).toFixed(2);

    this.productFee.get(controlName)?.setValue(formattedValue);
    input.value = formattedValue;

    input.maxLength = 7;
  }
  // ----------------In-valid controls-----------------
  isControlInvalidCardPlan(controlName: string) {
    const control = this.cardPlan.get(controlName);
    return control?.invalid && control?.touched;
  }
  isControlInvalidCardRate(controlName: string) {
    const control = this.cardRate.get(controlName);
    return control?.invalid && control?.touched;
  }
  isControlInvalidProductFee(controlName: string) {
    const control = this.productFee.get(controlName);
    return control?.invalid && control?.touched;
  }
}
