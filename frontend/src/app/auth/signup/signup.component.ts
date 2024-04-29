import {Component, inject, OnInit} from '@angular/core';
import {FormControl, FormGroup, ReactiveFormsModule, Validators} from '@angular/forms';
import {AuthServices} from '../auth.services';
import {Router, RouterLink} from "@angular/router";
import {NgClass} from "@angular/common";

@Component({
  selector: 'app-signup',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink, NgClass],
  templateUrl: './signup.component.html',
})
export class SignupComponent implements OnInit {
  myForm!: FormGroup;
  protected readonly onsubmit = onsubmit;
  private authService = inject(AuthServices);

  constructor(private router: Router) {
  }

  onSubmit() {
    const name = this.myForm.value.name;
    const email = this.myForm.value.email;
    const password = this.myForm.value.password;
    this.authService.register(name, email, password).subscribe({
      next: (response: any) => {
        if (response) {
          this.router.navigate(['/']);
        } else {
          console.log('error ao registrar');
        }
      },
      error: (error: any) => {
        console.log('error', error);
      }
    });
    this.myForm.reset();
  }

  ngOnInit() {
    this.myForm = new FormGroup({
      name: new FormControl(null, Validators.required),
      email: new FormControl(null, [
        Validators.required,
        Validators.pattern("[a-zA-Z0-9\-\_\.]+@[a-zA-Z0-9\-\_\.]+")
      ]),
      password: new FormControl(null, Validators.required)
    });
  }
}
