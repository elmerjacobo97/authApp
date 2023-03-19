import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../../services/auth.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styles: [],
})
export class RegisterComponent {
  miFormulario: FormGroup = this.fb.group({
    name: ['Elmer', [Validators.required, Validators.minLength(3)]],
    email: ['elmer@google.com', [Validators.required, Validators.email]],
    password: ['Elmer0.0', [Validators.required, Validators.minLength(6)]],
  });

  constructor(
    private router: Router,
    private fb: FormBuilder,
    private authService: AuthService
  ) {}

  register() {
    // console.log(this.miFormulario.value);
    const { name, email, password } = this.miFormulario.value;

    this.authService.register(name, email, password).subscribe((resp) => {
      // console.log(resp);
      if (resp === true) {
        this.router.navigateByUrl('/dashboard');
      } else {
        Swal.fire('Error', resp, 'error');
      }
    });
  }
}
