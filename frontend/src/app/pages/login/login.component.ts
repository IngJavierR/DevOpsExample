import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { SecurityService } from 'src/app/services/security.service';
import { ILoginReq } from 'src/app/model/http/security.model';
import { DataService } from 'src/app/services/data.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {
  formLogin: FormGroup;

  constructor(
    private fb: FormBuilder,
    private securityService: SecurityService,
    private dataService: DataService,
    private router: Router
  ) {
    this.formLogin = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });

    // TEST ONLY
    this.formLogin.patchValue({
      username: 'eve.holt@reqres.in'
    });
  }

  ngOnInit(): void { }

  login(): void {
    const data = {
      email: this.formLogin.controls.username.value,
      password: this.formLogin.controls.password.value,
    } as ILoginReq;

    this.securityService.login(data).subscribe(res => {
      this.dataService.setToken(res.token);
      this.router.navigate(['home']);
    }, err => {
      this.dataService.setGeneralNotificationMessage(err);
    }
    );
  }
}
