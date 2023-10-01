import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-admin-login',
  templateUrl: './admin-login.page.html',
  styleUrls: ['./admin-login.page.scss'],
})
export class AdminLoginPage implements OnInit {
  user_id:any='';
  password:any='';
  adminLoginResponse:any;
  constructor(private storage: Storage,
    private toastController: ToastController,
    private http: HttpClient,
    private router: Router) { }

  ngOnInit() { 
  }

  admin_login(){
    if(this.user_id!='' && this.password!=''){
      let url=environment.BaseURL+'register-api.php';
      let body={
        aksi: 'admin_login',
        user_id: this.user_id,
        password: this.password
      }
      this.http.post(url,body).subscribe(res=>{
        this.adminLoginResponse=res;
        if(this.adminLoginResponse.status){
          this.storage.set('user_type','admin');
          this.router.navigate(['dashboard']);
        }else{
          this.presentToast('bottom',this.adminLoginResponse.msg)
        }
      })
    }else{
      this.presentToast('bottom','Please enter user ID and password');
    }
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
