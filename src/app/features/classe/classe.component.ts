import { Component, OnInit } from '@angular/core';
import { Class } from '../../shared/interfaces/class';
import { ClassService } from '../../shared/services/class/class.service';

@Component({
  selector: 'app-classe',
  templateUrl: './classe.component.html',
  styleUrls: ['./classe.component.css']
})
export class ClasseComponent implements OnInit {
  classes: Class[] = [];
  newClassName: string = '';

  constructor(private classService: ClassService) { }

  ngOnInit(): void {
    this.classes = this.classService.getClasses();
  }

  addClass(): void {
    if (this.newClassName.trim()) {
      this.classService.addClass(this.newClassName);
      this.newClassName = '';
      this.classes = this.classService.getClasses(); 
    }
  }

  editClass(id: number): void {
    const newName = prompt('Enter new class name', this.classes.find(c => c.id === id)?.name);
    if (newName !== null && newName.trim()) {
      this.classService.updateClass(id, newName);
      this.classes = this.classService.getClasses();
    }
  }

  deleteClass(id: number): void {
    this.classService.deleteClass(id);
    this.classes = this.classService.getClasses();
  }
}
