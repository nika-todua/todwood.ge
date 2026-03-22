import { Component } from '@angular/core';

@Component({
  selector: 'app-projects',
  standalone: false,
  templateUrl: './projects.html',
  styleUrl: './projects.scss',
})
export class Projects {

  projectsArray:any = [
    {
      img:'https://images.unsplash.com/photo-1724301930658-2f21ae702d07',
      category:'საცხოვრებელი',
      title:'ძვირადღირებული სახლის საუნა',
      desc:'პრემიუმ კლასის კედრის ინტერიერი ინდივიდუალური განათებით და დეკორატიული დიზაინით.',
      location:'ტაჰოს ტბა, კალიფორნია',
    }
  ]
  
}
