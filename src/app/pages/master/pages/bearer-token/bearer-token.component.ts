import { Component } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzDescriptionsModule } from 'ng-zorro-antd/descriptions';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BearerToken } from '../../../../core/models/bearer-token';
import { BearerTokenService } from '../../../../core/services/bearer-token/bearer-token.service';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-bearer-token',
  standalone: true,
  imports: [
    NzTableModule,
    NzInputModule,
    NzDividerModule,
    ReactiveFormsModule,
    CommonModule,
    NzDescriptionsModule,
  ],
  templateUrl: './bearer-token.component.html',
  styleUrl: './bearer-token.component.css',
})
export class BearerTokenComponent {
  bearerTokenForm: FormGroup = new FormGroup({
    grantType: new FormControl('', [Validators.required]),
    clientId: new FormControl('', [Validators.required]),
    clientSecret: new FormControl('', [Validators.required]),
    scope: new FormControl('', [Validators.required]),
    // authUrl: new FormControl('', [Validators.required]),
  });
  constructor(
    private service: BearerTokenService,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    setTimeout(() => {
      this.bearerTokenForm.controls['grantType'].setValue('client_credentials');
      this.bearerTokenForm.controls['clientId'].setValue(
        'ab21c515-1f00-42b5-9630-33c2a7c97547'
      );
      this.bearerTokenForm.controls['clientSecret'].setValue(
        'F2O8Q~mhe4c4hiT5dYbMi7WikRB4z8DWODfPzb3E'
      );
      this.bearerTokenForm.controls['scope'].setValue(
        'ab21c515-1f00-42b5-9630-33c2a7c97547/.default'
      );
      // this.bearerTokenForm.controls['authUrl'].setValue(
      //   'https://login.microsoftonline.com/ea7eac76-2c48-4fa4-bd53-df6486df183c/oauth2/v2.0/token'
      // );
    }, 500);
  }
  spinner: boolean = false;
  submitBearerForm() {
    if (this.bearerTokenForm.valid) {
      this.spinner = true;
      // const formValue: BearerToken = this.bearerTokenForm.value as BearerToken;
      // console.log('Form submitted:', formValue);
      this.service
        .getBearerToken(
          this.bearerTokenForm.value.grantType,
          this.bearerTokenForm.value.clientId,
          this.bearerTokenForm.value.clientSecret,
          this.bearerTokenForm.value.scope
        )
        .subscribe({
          next: (res) => {
            console.log(res?.response);
            this.toastr.success(res?.response, 'Success');
            this.spinner = false;
            this.bearerTokenForm.reset();
          },
        });
    } else {
      Object.keys(this.bearerTokenForm.controls).forEach((controlName) => {
        const control = this.bearerTokenForm.get(controlName);
        if (control?.invalid) {
          control.markAsTouched();
        }
      });
    }
  }

  isControlInvalid(controlName: string) {
    const control = this.bearerTokenForm.get(controlName);
    return control?.invalid && control?.touched;
  }
}
