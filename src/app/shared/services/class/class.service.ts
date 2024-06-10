import { Injectable } from '@angular/core';
import { Class } from '../../interfaces/class';

@Injectable({
  providedIn: 'root'
})
export class ClassService {
  private classes: Class[] = [
    { id: 1, name: 'Terminal S1' },
    { id: 2, name: 'Terminal S2' },
    { id: 3, name: 'Terminal L1a' },
    { id: 4, name: 'Terminal L2b' }
  ];

  getClasses(): Class[] {
    return this.classes;
  }

  addClass(name: string): void {
    const newClass: Class = {
      id: this.classes.length + 1,
      name: name
    };
    this.classes.push(newClass);
  }

  updateClass(id: number, name: string): void {
    const cls = this.classes.find(c => c.id === id);
    if (cls) {
      cls.name = name;
    }
  }

  deleteClass(id: number): void {
    this.classes = this.classes.filter(c => c.id !== id);
  }
}
