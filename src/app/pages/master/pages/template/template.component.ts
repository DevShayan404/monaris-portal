import { Component } from '@angular/core';
import { NzTableModule } from 'ng-zorro-antd/table';
import { NzInputModule } from 'ng-zorro-antd/input';
import { NzDividerModule } from 'ng-zorro-antd/divider';
import { NzCollapseModule } from 'ng-zorro-antd/collapse';
import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { BearerToken } from '../../../core/models/bearer-token';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-template',
  standalone: true,
  imports: [
    NzTableModule,
    NzInputModule,
    NzDividerModule,
    NzCollapseModule,
    ReactiveFormsModule,
    CommonModule,
  ],
  templateUrl: './template.component.html',
  styleUrl: './template.component.css',
  animations: [
    trigger('slideToggle', [
      state(
        'closed',
        style({
          height: '0px',
          overflow: 'hidden',
          opacity: 0,
        })
      ),
      state(
        'open',
        style({
          height: '*',
          overflow: 'hidden',
          opacity: 1,
        })
      ),
      transition('closed => open', [animate('300ms ease-in-out')]),
      transition('open => closed', [animate('300ms ease-in-out')]),
    ]),
  ],
})
export class TemplateComponent {
  listOfData: BearerToken[] = [
    {
      clientId: 1,
      clientSecret: 'test',
      grantType: 'test',
      scope: 'test',
      authUrl: 'test',
    },
    {
      clientId: 1,
      clientSecret: 'test',
      grantType: 'test',
      scope: 'test',
      authUrl: 'test',
    },
    {
      clientId: 1,
      clientSecret: 'test',
      grantType: 'test',
      scope: 'test',
      authUrl: 'test',
    },
    {
      clientId: 1,
      clientSecret: 'test',
      grantType: 'test',
      scope: 'test',
      authUrl: 'test',
    },
  ];
  collapse!: boolean;
  bearerTokenForm!: FormGroup;
  constructor() {}

  ngOnInit(): void {
    this.bearerTokenForm = new FormGroup({
      clientId: new FormControl('', [Validators.required]),
      clientSecret: new FormControl('', [Validators.required]),
      grantType: new FormControl('', [Validators.required]),
      scope: new FormControl('', [Validators.required]),
      authUrl: new FormControl('', [Validators.required]),
    });
  }

  toggleCollapse() {
    this.collapse = !this.collapse;
  }

  submitBearerForm(data:any) {
    if (this.bearerTokenForm.valid) {
      const formValue: BearerToken = this.bearerTokenForm.value as BearerToken;
      console.log('Form submitted:', formValue);
      this.scrollToSection(data);
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
    // -----------Scroll to--------------
    scrollToSection(section: any) {
      setTimeout(() => {
        const element = document.getElementById(section);
        if (element) {
          element.scrollIntoView({ behavior: 'smooth' });
        }
      }, 0); // Adjust the delay if necessary
  }
  formatJson(obj: any) {
    // console.log(obj);
    // return JSON.stringify(obj, null, 2);
  }
}
