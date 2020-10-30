import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';

@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.page.html',
  styleUrls: ['./task-list.page.scss'],
})
export class TaskListPage implements OnInit {

  tasksData: any;

  constructor(public apiService: ApiService) {
    this.tasksData = [];
    this.apiService.preparaUrl('tasks');
  }

  ngOnInit() {
    // this.getAllStudents();
  }

  ionViewWillEnter() {
    // Used ionViewWillEnter as ngOnInit is not 
    // called due to view persistence in Ionic
    this.getAll();
  }

  getAll() {
    //Get saved list of students
    this.apiService.page = 'tasks';
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
