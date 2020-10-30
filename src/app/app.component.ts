import { Router, RouterEvent } from '@angular/router';
import { Component } from '@angular/core';

import { Platform } from '@ionic/angular';
import { SplashScreen } from '@ionic-native/splash-screen/ngx';
import { StatusBar } from '@ionic-native/status-bar/ngx';
import { Route } from '@angular/compiler/src/core';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss']
})
export class AppComponent {
  navigate: any;
  selectedPath = '';
  constructor(
    private platform: Platform,
    private splashScreen: SplashScreen,
    private statusBar: StatusBar,
    private router: Router
  ) {
    this.router.events.subscribe((event: RouterEvent) => {
      this.selectedPath = event.url;
    });
    this.sideMenu();
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  sideMenu()
  {
    this.navigate =
    [
      {
        title : "Home",
        url   : "/home",
        icon  : "home"
      },
      {
        title : "Monitoring",
        url   : "/home",
        icon  : "pulse"
      },
      {
        title : "Tasks",
        url   : "/task-list",
        icon  : "file-tray-full"
      },
      {
        title : "MAPS",
        url   : "/home",
        icon  : "location"
      },
      {
        title : "Operational",
        url   : "/home",
        icon  : "car"
      },
      {
        title : "Device",
        url   : "/home",
        icon  : "watch"
      },
      {
        title : "Profile",
        url   : "/user-detail",
        icon  : "finger-print"
      },
      {
        title : "Students",
        url   : "/student-list",
        icon  : "desktop-sharp"
      },
    ];
  }

}
