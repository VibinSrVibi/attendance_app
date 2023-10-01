import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-fill-user-profile',
  templateUrl: './fill-user-profile.page.html',
  styleUrls: ['./fill-user-profile.page.scss'],
})
export class FillUserProfilePage implements OnInit {
  username:any='';
  dob:any='';
  email:any='';
  profile_pic=''; 
  user_id:any='';
  user_type:any='';
  updateDataResponse:any;
  userDataResponse:any;
  constructor(private storage: Storage,
              private toastController: ToastController,
              private http: HttpClient,
              private router: Router) { }

  async ngOnInit() {
    // this.user_id=await this.storage.get('user_id');
    // this.user_type=await this.storage.get('user_type');
    // console.log(this.user_id,this.user_type)
    // this.get_user_profile_data(this.user_id);
  }

  async ionViewWillEnter(){
    //this.ngOnInit()
    this.user_id=await this.storage.get('user_id');
    this.user_type=await this.storage.get('user_type');
    console.log(this.user_id,this.user_type)
    this.get_user_profile_data(this.user_id);
  }

  async save_fill_user_profile(){
    if(this.username!='' && this.email!='' && this.dob!=''){
      let body={
        user_id: this.user_id,
        username: this.username,
        email: this.email,
        dob: this.dob,
        profile_pic: this.profile_pic ,
        aksi: 'fill_user_profile'
      }
      console.log(body)
      let url=environment.BaseURL+'register-api.php';
      this.http.post(url,body).subscribe(res=>{
        this.updateDataResponse=res;
        console.log('result ',this.updateDataResponse)
        if(this.updateDataResponse.status==true && this.updateDataResponse.statuscode==200){
          this.get_user_profile_data(this.user_id);
          console.log('yes')
          this.storage.set('login_status',1);
          this.storage.set('username',this.username)
          this.router.navigate(['dashboard']);
        }
      })
    }else{
      this.presentToast('bottom', 'Please fill required data');
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

  async get_user_profile_data(user_id:any){
    console.log('user_id inner function',user_id)
    let url=environment.BaseURL+'get_user_profile.php?user_id='+user_id;
    this.http.get(url).subscribe(res=>{
      console.log(res);
      this.userDataResponse=res;
      console.log(this.userDataResponse)
      if(this.userDataResponse.status){
        this.username=this.userDataResponse.data['username'];
        this.email=this.userDataResponse.data['email'];
        this.dob=this.userDataResponse.data['dob'];
        console.log(this.username)
      }
    })
  }

}
