import { ChangeDetectorRef, Component } from '@angular/core';
import { NzStepsModule } from 'ng-zorro-antd/steps';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { NzSelectModule } from 'ng-zorro-antd/select';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { MerchantService } from '../../../../../core/services/merchant/merchant.service';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { ToastrService } from 'ngx-toastr';
import { BearerTokenService } from '../../../../../core/services/bearer-token/bearer-token.service';
import { NzDatePickerModule } from 'ng-zorro-antd/date-picker';
import { DatePipe } from '@angular/common';
@Component({
  selector: 'app-add-merchant',
  standalone: true,
  imports: [
    CommonModule,
    NzStepsModule,
    ReactiveFormsModule,
    NzSelectModule,
    NzDescriptionsModule,
    NzDividerModule,
    NzTableModule,
    NzInputModule,
    NzDatePickerModule,
  ],
  templateUrl: './add-merchant.component.html',
  styleUrl: './add-merchant.component.css',
  providers: [DatePipe],
})
export class AddMerchantComponent {
  chainDetails: FormGroup = new FormGroup({
    firstName: new FormControl('', [
      Validators.required,
      Validators.maxLength(30),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.maxLength(30),
    ]),
    phone: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
    chainId: new FormControl('', [Validators.required]),
    // mid: new FormControl('', [Validators.required]),
  });
  bankingDetails: FormGroup = new FormGroup({
    currency: new FormControl('', [Validators.required]),
    institution: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(5),
    ]),
    transit: new FormControl('', [
      Validators.required,
      Validators.minLength(5),
      Validators.maxLength(5),
    ]),
    accountNo: new FormControl('', [
      Validators.required,
      Validators.maxLength(17),
    ]),
  });
  merchantDetails: FormGroup = new FormGroup({
    legalName: new FormControl('', [
      Validators.required,
      Validators.maxLength(30),
    ]),
    email: new FormControl('', [Validators.required, Validators.maxLength(60)]),
    operatingAsName: new FormControl('', [
      Validators.required,
      Validators.maxLength(30),
    ]),
    language: new FormControl('', [Validators.required]),
    cardHolderName: new FormControl('', [
      Validators.required,
      Validators.maxLength(30),
    ]),
    yearOfOwnership: new FormControl('', [Validators.required]),
    monthOfOwnerShip: new FormControl('', [Validators.required]),
    customerServicePhoneNo: new FormControl('', [
      Validators.required,
      Validators.maxLength(60),
    ]),
  });
  merchantLocation: FormGroup = new FormGroup({
    locationTypeId: new FormControl('', [Validators.required]),
    telephone: new FormControl('', [
      Validators.required,
      Validators.minLength(10),
      Validators.maxLength(10),
    ]),
    addressNo: new FormControl('', [
      Validators.required,
      Validators.maxLength(9),
    ]),
    postalCode: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(6),
      this.canadianPostalCodeValidator(),
    ]),
    country: new FormControl('', [Validators.required]),
    province: new FormControl('', [Validators.required]),
    city: new FormControl('', [Validators.required]),
    streetName: new FormControl('', [
      Validators.required,
      Validators.maxLength(50),
    ]),
  });
  businessDetails: FormGroup = new FormGroup({
    mcc: new FormControl('', [Validators.required]),
    masterCardVolume: new FormControl('', [Validators.required]),
    visaVolume: new FormControl('', [Validators.required]),
    discoverVolume: new FormControl('', [Validators.required]),
    unionPayVolume: new FormControl('', [Validators.required]),
    interacVolume: new FormControl('', [Validators.required]),
    amexVolume: new FormControl('', [Validators.required]),
    avgTicketSize: new FormControl('', [Validators.required]),
    maxTransaction: new FormControl('', [Validators.required]),
    directSelling: new FormControl('', [Validators.required]),
    businessUrl: new FormControl('', [
      Validators.required,
      Validators.maxLength(100),
    ]),
    eCommerce: new FormControl('', [Validators.required]),
    moto: new FormControl('', [Validators.required]),
    serviceDeliverToCanada: new FormControl('', [Validators.required]),
    serviceDeliverToUS: new FormControl('', [Validators.required]),
    isSeasonalMerchant: new FormControl('', [Validators.required]),
  });
  securityDetails: FormGroup = new FormGroup({
    typeOfBusiness: new FormControl('', [Validators.required]),
    firstName: new FormControl('', [
      Validators.required,
      Validators.maxLength(30),
    ]),
    lastName: new FormControl('', [
      Validators.required,
      Validators.maxLength(30),
    ]),
    birthDate: new FormControl('', [Validators.required]),
    allowCreditReports: new FormControl('', [Validators.required]),
    percentageOwnership: new FormControl('', [
      Validators.required,
      this.percentageOwnershipValidator(),
    ]),
    title: new FormControl('', [Validators.required]),
  });
  businessActivity: FormGroup = new FormGroup({
    dropShipping: new FormControl('', [Validators.required]),
  });
  addChainIdForm: FormGroup = new FormGroup({
    addChainId: new FormControl('', [
      Validators.required,
      // this.digitsLengthValidator(13),
    ]),
  });
  current: number = 0;
  booleanList: boolean[] = [true, false];
  dropdownList: any;
  chainIdSpinner: boolean = false;
  spinner: boolean = false;
  constructor(
    private service: MerchantService,
    private bearerService: BearerTokenService,
    private toastr: ToastrService,
    private datePipe: DatePipe
  ) {}
  ngOnInit(): void {
    this.getAllDropdownList();
  }
  // ----------------Fetch Apis-----------------
  getAllDropdownList() {
    this.service.getAllDropdownList().subscribe({
      next: (res) => {
        this.dropdownList = res;
        // console.log(res);
      },
    });
  }

  // ----------------Next/Pre case-----------------
  pre(): void {
    this.current -= 1;
  }
  next(): void {
    switch (this.current) {
      case 0:
        this.onSubmitChainDetails();
        break;
      case 1:
        this.onSubmitBankingDetails();
        break;
      case 2:
        this.onSubmitBusinessDetails();
        break;
      case 3:
        this.onSubmitMerchantDetails();
        break;
      case 4:
        this.onSubmitMerchantLocation();
        break;
      case 5:
        this.onSubmitBusinessActivity();
        break;

      default:
        break;
    }
  }

  // ----------------Form submission methods-----------------
  onSubmitChainDetails() {
    if (this.chainDetails.valid) {
      this.current += 1;
    } else {
      Object.keys(this.chainDetails.controls).forEach((controlName) => {
        const control = this.chainDetails.get(controlName);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }

  onSubmitBankingDetails() {
    if (this.bankingDetails.valid) {
      this.current += 1;
    } else {
      Object.keys(this.bankingDetails.controls).forEach((controlName) => {
        const control = this.bankingDetails.get(controlName);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }
  onSubmitBusinessDetails() {
    if (this.businessDetails.valid) {
      this.current += 1;
    } else {
      Object.keys(this.businessDetails.controls).forEach((controlName) => {
        const control = this.businessDetails.get(controlName);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }
  onSubmitMerchantDetails() {
    if (this.merchantDetails.valid) {
      this.current += 1;
    } else {
      Object.keys(this.merchantDetails.controls).forEach((controlName) => {
        const control = this.merchantDetails.get(controlName);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }
  onSubmitMerchantLocation() {
    if (this.merchantLocation.valid) {
      this.current += 1;
    } else {
      Object.keys(this.merchantLocation.controls).forEach((controlName) => {
        const control = this.merchantLocation.get(controlName);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }
  onSubmitBusinessActivity() {
    if (this.businessActivity.valid) {
      this.current += 1;
    } else {
      Object.keys(this.businessActivity.controls).forEach((controlName) => {
        const control = this.businessActivity.get(controlName);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }

  // ----------------Final form Submission-----------------
  onSubmitSecurityDetails() {
    // alert(this.securityDetails.value.typeOfBusiness);
    if (this.securityDetails.valid) {
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
            // console.log(res);
            this.service
              .postMerchantForm({
                chainDetails: {
                  chainProfile: {
                    chainId: this.chainDetails.value.chainId,
                  },
                },
                bankingDetails: {
                  creditDepositAccount: {
                    currency: this.bankingDetails.value.currency,
                    institution: this.bankingDetails.value.institution,
                    transit: this.bankingDetails.value.transit,
                    accountNumber: this.bankingDetails.value.accountNo,
                  },
                  additionalBankingAccounts: [],
                },
                businessDetails: {
                  masterCardVolume:
                    +this.businessDetails.value.masterCardVolume,
                  visaVolume: +this.businessDetails.value.visaVolume,
                  discoverVolume: +this.businessDetails.value.discoverVolume,
                  unionPayVolume: +this.businessDetails.value.unionPayVolume,
                  interacVolume: +this.businessDetails.value.interacVolume,
                  amexVolume: +this.businessDetails.value.amexVolume,
                  mcc: this.businessDetails.value.mcc,
                  avgTicketSize: +this.businessDetails.value.avgTicketSize,
                  isSeasonalMerchant:
                    this.businessDetails.value.isSeasonalMerchant,
                  maxTransaction: +this.businessDetails.value.maxTransaction,
                  directSelling: +this.businessDetails.value.directSelling,
                  moto: +this.businessDetails.value.moto,
                  ecommerce: +this.businessDetails.value.eCommerce,
                  businessURL: this.businessDetails.value.businessUrl,
                  serviceDeliverToCanada:
                    this.businessDetails.value.serviceDeliverToCanada,
                  serviceDeliverToUS:
                    this.businessDetails.value.serviceDeliverToUS,
                },
                merchantDetails: {
                  contact: {
                    firstName: this.chainDetails.value.firstName,
                    lastName: this.chainDetails.value.lastName,
                    phone: this.chainDetails.value.phone,
                  },
                  merchant: {
                    language: this.merchantDetails.value.language,
                    legalName: this.merchantDetails.value.legalName,
                    operatingAsName: this.merchantDetails.value.operatingAsName,
                    cardHolderName: this.merchantDetails.value.cardHolderName,
                    yearsOfOwnership:
                      +this.merchantDetails.value.yearOfOwnership,
                    monthsOfOwnership:
                      +this.merchantDetails.value.monthOfOwnerShip,
                    customerServicePhoneNumber:
                      this.merchantDetails.value.customerServicePhoneNo,
                    email: this.merchantDetails.value.email,
                  },
                  locationAddress: {
                    addressNumber: this.merchantLocation.value.addressNo,
                    streetName: this.merchantLocation.value.streetName,
                    telephone: this.merchantLocation.value.telephone,
                    postalCode: this.merchantLocation.value.postalCode,
                    city: this.merchantLocation.value.city,
                    province: this.merchantLocation.value.province,
                    country: this.merchantLocation.value.country,
                  },
                },
                businessActivity: {
                  dropShipping: this.businessActivity.value.dropShipping,
                },
                securityDetails: {
                  legalEntity: {
                    typeOfBusiness: this.securityDetails.value.typeOfBusiness,
                  },
                  signingOfficers: [
                    {
                      allowCreditReport:
                        this.securityDetails.value.allowCreditReports,
                      firstName: this.securityDetails.value.firstName,
                      lastName: this.securityDetails.value.lastName,
                      address: {
                        addressNumber: this.merchantLocation.value.addressNo,
                        telephone: this.merchantLocation.value.telephone,
                        postalCode: this.merchantLocation.value.postalCode,
                        city: this.merchantLocation.value.city,
                        province: this.merchantLocation.value.province,
                        streetName: this.merchantLocation.value.streetName,
                        country: this.merchantLocation.value.country,
                      },
                      birthDate: this.datePipe.transform(
                        this.securityDetails.value.birthDate,
                        'yyyy-MM-dd'
                      ),
                      percentageOwnership:
                        +this.securityDetails.value.percentageOwnership,
                      title: this.securityDetails.value.title,
                    },
                  ],
                },
              })
              .subscribe({
                next: (res) => {
                  if (res?.errors.length <= 0) {
                    this.toastr.success(res?.response, 'Mercant Id');
                    this.chainDetails.reset();
                    this.bankingDetails.reset();
                    this.merchantDetails.reset();
                    this.merchantLocation.reset();
                    this.businessDetails.reset();
                    this.securityDetails.reset();
                    this.businessActivity.reset();
                    this.current = 0;
                  } else {
                    const error = JSON.parse(res?.errors[0]);
                    this.toastr.error(error.errors[0], 'Error');
                  }
                  this.spinner = false;
                },
                error: (err) => {
                  console.log(err);

                  this.spinner = false;
                  this.toastr.error('Try Again', 'Error');
                },
              });
          },
        });
    } else {
      Object.keys(this.securityDetails.controls).forEach((controlName) => {
        const control = this.securityDetails.get(controlName);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }

  // ----------------Validation-----------------
  onPhoneInput(event: Event): void {
    const input = event.target as HTMLInputElement;
    const filteredValue = input.value.replace(/[^0-9]/g, ''); // Keep only digits
    input.value = filteredValue; // Set input to filtered value

    // Update the form control with the new value
    this.chainDetails.get('phone')?.setValue(filteredValue);

    // Mark the control as dirty so validation messages show immediately
    this.chainDetails.get('phone')?.markAsDirty();
  }
  canadianPostalCodeValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const postalCodePattern = /^[A-Za-z]\d[A-Za-z]\d[A-Za-z]\d$/;
      const valid = postalCodePattern.test(control.value);
      return valid ? null : { invalidPostalCode: true };
    };
  }
  percentageOwnershipValidator(): ValidatorFn {
    return (control: AbstractControl): { [key: string]: any } | null => {
      const value = control.value;
      if (value === null || value === '') {
        return null; // Don't validate empty field
      }
      const numberValue = Number(value);
      const valid = numberValue >= 0 && numberValue <= 100;
      return valid ? null : { invalidPercentage: true };
    };
  }

  // ----------------Chain id form Submission-----------------
  addChainId(): void {
    if (this.addChainIdForm.valid) {
      this.chainIdSpinner = true;
      this.service.postChainId(this.addChainIdForm.value.addChainId).subscribe({
        next: (res) => {
          this.addChainIdForm.reset();
          this.chainIdSpinner = false;
          this.getAllDropdownList();
        },
      });
    } else {
      Object.keys(this.addChainIdForm.controls).forEach((controlName) => {
        const control = this.addChainIdForm.get(controlName);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }

  // ----------------In-valid controls-----------------
  isControlInvalidChainDetails(controlName: string) {
    const control = this.chainDetails.get(controlName);
    return control?.invalid && control?.touched;
  }
  isControlInvalidAddChainId(controlName: string) {
    const control = this.addChainIdForm.get(controlName);
    return control?.invalid && control?.touched;
  }
  isControlInvalidBankingDetails(controlName: string) {
    const control = this.bankingDetails.get(controlName);
    return control?.invalid && control?.touched;
  }
  isControlInvalidMerchantDetails(controlName: string) {
    const control = this.merchantDetails.get(controlName);
    return control?.invalid && control?.touched;
  }
  isControlInvalidMerchantLocation(controlName: string) {
    const control = this.merchantLocation.get(controlName);
    return control?.invalid && control?.touched;
  }
  isControlInvalidBusinessDetails(controlName: string) {
    const control = this.businessDetails.get(controlName);
    return control?.invalid && control?.touched;
  }
  isControlInvalidSecurityDetails(controlName: string) {
    const control = this.securityDetails.get(controlName);
    return control?.invalid && control?.touched;
  }
  isControlInvalidBusinessActivity(controlName: string) {
    const control = this.businessActivity.get(controlName);
    return control?.invalid && control?.touched;
  }

  // Custom Validator
  // private digitsLengthValidator(length: number): ValidatorFn {
  //   return (control: AbstractControl): ValidationErrors | null => {
  //     const value = control.value;
  //     return value && value.toString().length !== length
  //       ? { invalidLength: true }
  //       : null;
  //   };
  // }
}
