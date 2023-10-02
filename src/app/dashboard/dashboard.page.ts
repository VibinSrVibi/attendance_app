import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';
import { PopoverController } from '@ionic/angular';


@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage implements OnInit {
  tab_data:any;
  user_id:any='';
  user_type:any='';
  username:any='';
  current_date:any='';
  saveLoginResponse:any;
  getLoginResponse:any;
  today_login_status:boolean=false;
  getAllUserAttendaceResponse:any;
  present_users:any=0;
  absent_users:any=0;
  isOpen: Boolean=false;
  constructor(private storage: Storage,
    private toastController: ToastController,
    private http: HttpClient,
    private router: Router,
    private popoverController: PopoverController) {
      
     }

  async ngOnInit() {
    console.log('current route ',this.router.url)
    // this.user_type=await this.storage.get('user_type');
    
    // this.current_date=new Date();
    

    // console.log(this.user_id,this.user_type,this.username)
    // if(this.user_type=='admin'){
    //   this.get_all_user_attendance();
    //   this.tab_data=[
    //     {
    //       text: 'Home',
    //       icon: 'home-outline',
    //       route: ''
    //     },{
    //       text: 'Attendance Report',
    //       icon: 'book-outline',
    //       route: ''
    //     },{
    //       text: 'Paid Report',
    //       icon: 'card-outline',
    //       route: ''
    //     }
    //   ]
    // }else{
    //   this.user_id=await this.storage.get('user_id');
    //   this.username=await this.storage.get('username');
    //   this.get_login_data();
    //   this.tab_data=[
    //     {
    //       text: 'Home',
    //       icon: 'home-outline',
    //       route: ''
    //     },{
    //       text: 'Attendance Report',
    //       icon: 'book-outline',
    //       route: ''
    //     }
    //   ]
    // }
    // console.log(this.user_id,this.user_type,this.username)
  }

  async ionViewWillEnter(){
    this.user_type=await this.storage.get('user_type');
    
    this.current_date=new Date();
    

    console.log(this.user_id,this.user_type,this.username)
    if(this.user_type=='admin'){
      this.get_all_user_attendance();
      this.tab_data=[
        {
          text: 'Home',
          icon: 'home-outline',
          route: 'dashboard'
        },{
          text: 'Attendance Report',
          icon: 'book-outline',
          route: 'show-attendance-report'
        },{
          text: 'Paid Report',
          icon: 'card-outline',
          route: 'show-monthly-fee-report'
        }
      ]
    }else{
      this.user_id=await this.storage.get('user_id');
      this.username=await this.storage.get('username');
      this.get_login_data();
      this.tab_data=[
        {
          text: 'Home',
          icon: 'home-outline',
          route: 'dashboard'
        },{
          text: 'Attendance Report',
          icon: 'book-outline',
          route: 'show-attendance-report'
        }
      ]
    }
    console.log(this.user_id,this.user_type,this.username)
  }
  test(){
    console.log('yes')
  }
  save_logIn(){
    console.log('sss')
    console.log(this.user_id)
    if(this.user_id!=''){
      let body={
        aksi: 'save_attendance',
        user_id: this.user_id
      }
      console.log('c')
      let url=environment.BaseURL+'register-api.php';
      this.http.post(url,body).subscribe(res=>{
        this.saveLoginResponse=res;
        console.log(this.saveLoginResponse);
        if(this.saveLoginResponse.status==true && this.saveLoginResponse.statuscode==200){
          this.presentToast('bottom',this.saveLoginResponse.msg);
          this.get_login_data();
        }else{
          this.presentToast('bottom',this.saveLoginResponse.msg);
        }
      })
    }else{
      this.router.navigate(['register']);
    }
  }

  get_login_data(){ 
    let url=environment.BaseURL+'get_current_date_user_login.php?user_id='+this.user_id;
    console.log(url)
    this.http.get(url).subscribe(res=>{
      this.getLoginResponse=res;
      if(this.getLoginResponse.status==true){
        console.log(this.getLoginResponse.data)
        if(this.getLoginResponse.data==null){
          console.log('null data');
        }else{
          console.log('value exit ')
          this.today_login_status=true;
        }
      }
    });
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

  async get_all_user_attendance(){
    let url=environment.BaseURL+'get_all_current_date_user_attendance.php';
    this.http.get(url).subscribe(res=>{
      this.getAllUserAttendaceResponse=res;
      console.log(this.getAllUserAttendaceResponse)
      if(this.getAllUserAttendaceResponse.status){
        console.log(this.getAllUserAttendaceResponse.data.length)
        this.present_users=this.getAllUserAttendaceResponse.data.length;
        this.absent_users=this.getAllUserAttendaceResponse.total_users-this.present_users;
      }
    })
  }
  

  async logout(){
    this.storage.clear();
    await this.popoverController.dismiss();
    this.router.navigate(['/']);
  }

  async show_current_date_attendance(){
    this.router.navigate(['show-attendance']);
  }

  tab_route(route:any){
    this.router.navigate([route]);
  }
  
}
