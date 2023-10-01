import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Storage } from '@ionic/storage-angular';
import { environment } from 'src/environments/environment';
import { PopoverController } from '@ionic/angular';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-show-attendance-report',
  templateUrl: './show-attendance-report.page.html',
  styleUrls: ['./show-attendance-report.page.scss'],
})
export class ShowAttendanceReportPage implements OnInit {
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
  attendanceReportResponse:any;
  show_attendance_flag=false;
  user_data:any;
  attendance_data:any;
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
    this.years.push(current_year);
    for(var i=1; i<5; i++){
      let previous_year=current_year-i;
      this.years.push(previous_year);
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
          route: ''
        }
      ]
      this.get_attendance_report();
    }else{
      this.user_id=await this.storage.get('user_id');
      this.username=await this.storage.get('username');
      this.get_attendance_user_report();
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

  choose_month(event:any){
    console.log(event.detail.value)
    this.current_month=event.detail.value;
  }

  choose_year(event:any){
    this.current_year=event.detail.value;
  }

  get_attendance_report(){
    let url=environment.BaseURL+'admin_attendance_filter.php?month='+this.current_month+'&year='+this.current_year;
    console.log(url)
    this.http.get(url).subscribe(res=>{
      this.attendanceReportResponse=res;
      console.log(this.attendanceReportResponse)
      if(this.attendanceReportResponse.attendance_data.length>0 && this.attendanceReportResponse.user_data.length>0){
        this.show_attendance_flag=true;
        this.user_data=this.attendanceReportResponse.user_data;
        this.attendance_data=this.attendanceReportResponse.attendance_data;
      }else{
        this.show_attendance_flag=false;
      }
    })
  }

  get_attendance_user_report(){
    let url=environment.BaseURL+'user_attendance_filter.php?month='+this.current_month+'&year='+this.current_year+'&user_id='+this.user_id;
    console.log(url)
    this.http.get(url).subscribe(res=>{
      this.attendanceReportResponse=res;
      console.log(this.attendanceReportResponse)
      if(this.attendanceReportResponse.attendance_data.length>0 && this.attendanceReportResponse.user_data.length>0){
        this.show_attendance_flag=true;
        this.user_data=this.attendanceReportResponse.user_data;
        this.attendance_data=this.attendanceReportResponse.attendance_data;
      }else{
        this.show_attendance_flag=false;
      }
    })
  }
}
