import { Component, OnInit, inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { User } from 'src/app/models/user.model';
import { FirebaseService } from 'src/app/services/firebase.service';
import { UtilsService } from 'src/app/services/utils.service';

@Component({
  selector: 'app-auth',
  templateUrl: './auth.page.html',
  styleUrls: ['./auth.page.scss'],
})
export class AuthPage implements OnInit {
  private serivice = inject(FirebaseService);
  private utilsservice = inject(UtilsService);

  form = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', Validators.required),
  });

  ngOnInit() {}

  async submit() {
    const loading = await this.utilsservice.loading();
    await loading.present();
    this.serivice.signin(this.form.value as User).then((res) => {
      console.log(res);
    }).catch((err) => {
      console.log(err);
    }).finally(() => {
      loading.dismiss();
    });
  }
}
