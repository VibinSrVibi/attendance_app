import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';
import { PopoverController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-show-monthly-fee-report',
  templateUrl: './show-monthly-fee-report.page.html',
  styleUrls: ['./show-monthly-fee-report.page.scss'],
})
export class ShowMonthlyFeeReportPage implements OnInit {

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

  ngOnInit() {
  }

  async ionViewWillEnter(){
    this.user_type=await this.storage.get('user_type');
    
    this.current_date=new Date();
    

    console.log(this.user_id,this.user_type,this.username)
    if(this.user_type=='admin'){
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

  async logout(){
    this.storage.clear();
    await this.popoverController.dismiss();
    this.router.navigate(['/']);
  }
  
  tab_route(route:any){
    this.router.navigate([route]);
  }

}
