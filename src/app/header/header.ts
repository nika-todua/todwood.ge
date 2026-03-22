import { Component } from '@angular/core';

@Component({
  selector: 'app-header',
  standalone: false,
  templateUrl: './header.html',
  styleUrl: './header.scss',
})
export class Header {

  activeClass:string = ''
  toggleCount:number = 0

  isActive = false;

  toggleEvent(){
    this.toggleCount++
    this.isActive = !this.isActive;
    
    if(this.toggleCount % 2 === 0){
      this.activeClass = ''
    }else{
      this.activeClass = 'activeToggle'
    }
  }
  
}
