import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})
export class LoginPage implements OnInit {

  tasksData: any;
  url: any;
  status:string="";

  constructor(
    public apiService: ApiService,
    private alert: AlertController,
    public router: Router,
    ) {
    this.tasksData = [];
    this.url = 'users';
  }

  ngOnInit() {

    this.getAllUsers();

  }

  login(form){

    let response = this.tasksData;
    for (let i in response) {

      if(response[i]['email'] == form.value['email'] && response[i]['senha'] == form.value['password']){
        localStorage.setItem("loginId", response[i]['userid']);
        this.router.navigate(['user-list']);
        break;
      }

    }

  }

  getAllUsers() {
    this.apiService.preparaUrl(this.url);
    //Get saved list of students
    this.apiService.getList().subscribe(response => {
      console.log(response);
      this.tasksData = response;
    });
  }

}
