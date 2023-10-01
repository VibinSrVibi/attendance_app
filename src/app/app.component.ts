import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Storage } from '@ionic/storage-angular';

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
    this.ionViewWillEnter();
  }

  async ionViewWillEnter(){
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

}
