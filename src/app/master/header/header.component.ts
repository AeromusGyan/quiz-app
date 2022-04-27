import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  sign =false;
  
  constructor() { }

  ngOnInit(): void {
  }

  signout()
  {
    localStorage.removeItem("userdata");
    window.location.href='/';
    this.sign = true;
  }
}
