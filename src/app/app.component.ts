import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';
import { App } from '@capacitor/app';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
})
export class AppComponent {
  user_id:any='';
  user_type:any='';
  constructor(private storage: Storage,
              private router: Router) {}

  async ngOnInit(){
    await this.storage.create();
    this.setupListener();
    this.ionViewWillEnter();
  }

  async ionViewWillEnter(){
    console.log('current route ',this.router.url)
    //this.ngOnInit()
    console.log('ion view')
    this.user_id=await this.storage.get('user_id');
    this.user_type=await this.storage.get('user_type');
    console.log(this.user_id,this.user_type)
    if(this.user_type=='admin'){
      this.router.navigate(['dashboard']);
    }else{
      console.log('yes')
      console.log(this.user_id)
      if(this.user_id!=null){
        this.router.navigate(['dashboard']);
      }else{
        this.router.navigate(['/']);
      }
    }
  }

  async setupListener() {
    App.addListener('appStateChange', ({ isActive }) => {
      if (!isActive) {
        // App went to background
        // Save anything you fear might be lost
      } else {
        // App went to foreground
        // restart things like sound playing
      }
    });

    App.addListener('backButton', (data) => {
      console.log('back button click:', JSON.stringify(data));
      if (data.canGoBack) {
        if(this.router.url!=''){
          window.history.back();
        }else{
          App.exitApp();
        }
      } else {
        // Maybe show alert before closing app?
        App.exitApp();
      }
    });
  }

}
