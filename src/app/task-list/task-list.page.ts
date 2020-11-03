import { Task } from './../models/task';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
})
export class TaskListPage implements OnInit {

  tasksData: any;
  url: any;
  status:string="";

  constructor(
    public apiService: ApiService,
    private alert: AlertController,
    public router: Router,
    ) {
    this.tasksData = [];
    this.url = 'tasks';
  }

  ngOnInit() {
    // this.getAllStudents();
  }

  async presentAlertCheckbox(item) {
    this.alert.create({
      cssClass: 'my-custom-class',
      header: 'Aceitar Tarefa',
      subHeader: item.title,
      buttons: [
        {
          text: 'Cancel',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (data) => {
            console.log(item);
            this.status = "Confirm Canceled " + item.id;
            console.log(this.status);
          }
        },
        {
          text: 'Ok',
          handler: (data) => {
            let task = new Task();
            task = item;
            task.accepted = true;
            
            this.apiService.updateItem(item.id, task).subscribe(response => {});
          }
        }
      ]
    }).then((confirmElement) => {
      confirmElement.present();
    });

}

  ionViewWillEnter() {
    // Used ionViewWillEnter as ngOnInit is not 
    // called due to view persistence in Ionic
    this.getAllStudents();
  }

  getAllStudents() {
    this.apiService.preparaUrl(this.url);
    //Get saved list of students
    this.apiService.getList().subscribe(response => {
      console.log(response);
      this.tasksData = response;
    })
  }


  delete(item) {
    //Delete item in Student data
    this.apiService.deleteItem(item.id).subscribe(Response => {
      //Update list after delete is successful
      this.getAllStudents();
    });
  }

}
