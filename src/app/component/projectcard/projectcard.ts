import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-projectcard',
  standalone: false,
  templateUrl: './projectcard.html',
  styleUrl: './projectcard.scss',
})
export class Projectcard {
  @Input() cardinfo: any = [];
}