import { Component, OnInit } from '@angular/core';
import {HttpClient,HttpHeaders} from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ToastController } from '@ionic/angular';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
})
export class RegisterPage implements OnInit {
  country_code:any='91';
  mobile:any='';
  userRegisterResponse:any;
  constructor(private http: HttpClient,
              private toastController: ToastController,
              private router: Router,
              private storage: Storage) { }

  ngOnInit() {
  }

  user_register(){
    if(this.mobile!=''){
      let body={
        aksi:"user_register",
        mobile:this.mobile,
        country_code:this.country_code,
        user_type:"user",
        device_token:""
      }
      console.log(environment.BaseURL)
      //this.http.post('')
      let url=environment.BaseURL+'register-api.php';
      let httpHeader={
        Headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      }
      this.http.post(url,body).subscribe(res=>{
        console.log(res,res);
        this.userRegisterResponse=res;
        console.log(this.userRegisterResponse.status)
        if(this.userRegisterResponse.status==true && this.userRegisterResponse.statuscode==200){
          //set local storage
          console.log('user_id',this.userRegisterResponse.user_id)
          this.storage.set('user_id',this.userRegisterResponse.user_id);
          this.storage.set('user_type','user');
          this.storage.set('login_status',this.userRegisterResponse.login_status);
          if(this.userRegisterResponse.login_status==1){
            //go to dashboard
            this.router.navigate(['dashboard']);
          }else{
            //go to fill profile
            this.router.navigate(['fill-user-profile'])
          }
          this.mobile='';
        }else{
          this.presentToast('bottom',this.userRegisterResponse.msg);
        }
      });
    }else{
      this.presentToast('bottom','Please enter your mobile number');
    }
  }

  goto_admin_login(){
    this.router.navigate(['admin-login']);
  }

  async presentToast(position: 'top' | 'middle' | 'bottom', message:any='') {
    //position: 'top' | 'middle' | 'bottom'
    const toast = await this.toastController.create({
      message: message,
      duration: 1500,
      position: position,
    });

    await toast.present();
  }

}
