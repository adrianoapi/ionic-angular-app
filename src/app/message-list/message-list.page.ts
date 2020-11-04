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

  from: number;
  to: number;
  data: Message;

  constructor(
    public activatedRoute: ActivatedRoute,
    public apiService: ApiService,
    private alert: AlertController,
    public router: Router,
    ) {
    this.messagesData = [];
    this.url = 'messages';
  }

  ngOnInit() {
    this.from = this.activatedRoute.snapshot.params["from"];
    this.to = this.activatedRoute.snapshot.params["to"];
    this.getAllStudents();
  }

  ionViewWillEnter() {
    // Used ionViewWillEnter as ngOnInit is not 
    // called due to view persistence in Ionic
    this.getAllStudents();
  }

  getAllStudents() {
    this.apiService.preparaUrl(this.url);
    this.apiService.getList().subscribe(response => {
      
      let response_new = [];
      var count = 0;
      for (let i in response) {
        if(response[i]['from'] === Number(this.from) && response[i]['to'] === Number(this.to) ||
           response[i]['from'] === Number(this.to)   && response[i]['to'] === Number(this.from)){
          response_new[count] = response[i];
          count++;
        }
      }

      this.messagesData = response_new;
    });
  }


  delete(item) {
    //Delete item in Student data
    this.apiService.deleteItem(item.id).subscribe(Response => {
      //Update list after delete is successful
      this.getAllStudents();
    });
  }

}
