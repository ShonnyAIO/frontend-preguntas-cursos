import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  usuario : string = localStorage.getItem('usuario') || '';

  constructor() {}

  ngOnInit(): void {
    
  }

}
