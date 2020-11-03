import { Message } from './../models/message';
import { Component, OnInit } from '@angular/core';
import { ApiService } from '../services/api.service';
import { AlertController } from '@ionic/angular';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-message-list',
  templateUrl: './message-list.page.html',
  styleUrls: ['./message-list.page.scss'],
})
export class MessageListPage implements OnInit {

  messagesData: any;
  url: any;

  id: number;
  data: Message;

  constructor(
    public apiService: ApiService,
    private alert: AlertController,
    public router: Router,
    ) {
    this.messagesData = [];
    this.url = 'messages';
  }

  ngOnInit() {
    this.getAllStudents();
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
      this.messagesData = response;
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
