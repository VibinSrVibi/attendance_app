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
  filterMonth:any='';
  years:any=[];
  current_year:any='';
  current_month:any='';
  monthlyFreeReportResponse:any;
  show_report_flag=false;
  user_data:any;
  monthlyFreeReport:any;
  markAsPaidResponse:any;
  constructor(private storage: Storage,
    private toastController: ToastController,
    private http: HttpClient,
    private router: Router,
    private popoverController: PopoverController) {
      
     }

  ngOnInit() {
  }

  async ionViewWillEnter(){
    let date=new Date();
    let current_year=date.getFullYear();
    
    var str = "" + date.getMonth()
    var pad = "00"
    var ans:any = pad.substring(0, pad.length - str.length) + str
    this.current_month=ans*1+1;
    console.log(this.current_month)
    this.current_year=current_year;
    if(!this.years.includes(current_year)){
      this.years.push(current_year);
    }
    
    for(var i=1; i<5; i++){
      let previous_year=current_year-i;
      if(!this.years.includes(previous_year)){
        this.years.push(previous_year);
      }
      
    }
    //this.years=this.years.reverse();
    console.log('years',this.years)
    this.user_type=await this.storage.get('user_type');
    
    this.current_date=new Date();
    

    console.log(this.user_id,this.user_type,this.username)
    if(this.user_type=='admin'){
      //this.get_all_user_attendance();
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
      ];
      this.get_monthly_fee_report();
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

  //http://localhost/attendance_app_backend/api/admin_monthly_fee_report.php?month=11&year=2023

  async logout(){
    this.storage.clear();
    await this.popoverController.dismiss();
    this.router.navigate(['/']);
  }
  
  tab_route(route:any){
    this.router.navigate([route]);
  }

  choose_month(event:any){
    console.log(event.detail.value)
    this.current_month=event.detail.value;
  }

  choose_year(event:any){
    this.current_year=event.detail.value;
  }

  async get_monthly_fee_report(){
    let url=environment.BaseURL+'admin_monthly_fee_report.php?month='+this.current_month+'&year='+this.current_year;
    this.http.get(url).subscribe(res=>{
      this.monthlyFreeReportResponse=res;
      if(this.monthlyFreeReportResponse.status){
        this.show_report_flag=true;
        this.monthlyFreeReport=this.monthlyFreeReportResponse.data;
      }
    })
  }

  mark_as_paid(user_id:any,month:any,year:any){
    let url=environment.BaseURL+'register-api.php';
    let body={
      aksi: 'mark_monthly_fee_as_paid',
      user_id: user_id,
      month: month,
      year: year
    }
    this.http.post(url,body).subscribe(res=>{
      this.markAsPaidResponse=res;
      if(this.markAsPaidResponse.status){

      }else{

      }
    })
  }

}
