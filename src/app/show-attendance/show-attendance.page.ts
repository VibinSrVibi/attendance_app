import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';
import { PopoverController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-show-attendance',
  templateUrl: './show-attendance.page.html',
  styleUrls: ['./show-attendance.page.scss'],
})
export class ShowAttendancePage implements OnInit {
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
  currentDateAttendance:any;
  constructor(private storage: Storage,
    private toastController: ToastController,
    private http: HttpClient,
    private router: Router,
    private popoverController: PopoverController) {
      
     }

  ngOnInit() {
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
          route: ''
        }
      ]
    }else{
      this.user_id=await this.storage.get('user_id');
      this.username=await this.storage.get('username');
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
        this.currentDateAttendance=this.getAllUserAttendaceResponse.data;
      }
    })
  }
  

  async logout(){
    this.storage.clear();
    await this.popoverController.dismiss();
    this.router.navigate(['/']);
  }

  tab_route(route:any){
    this.router.navigate([route]);
  }

}
