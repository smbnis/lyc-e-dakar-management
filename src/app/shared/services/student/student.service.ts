import { Injectable } from '@angular/core';
import { Student } from '../../interfaces/student';
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  private students: Student[] = [
    { id: 1, name: 'Penda Sarr', classId: 2 }
  ];

  getStudents(): Student[] {
    return this.students;
  }

  addStudent(name: string, classId: number): void {
    const newStudent: Student = {
      id: this.students.length + 1,
      name: name,
      classId: classId
    };
    this.students.push(newStudent);
  }

  updateStudent(id: number, name: string, classId: number): void {
    const student = this.students.find(s => s.id === id);
    if (student) {
      student.name = name;
      student.classId = classId;
    }
  }

  deleteStudent(id: number): void {
    this.students = this.students.filter(s => s.id !== id);
  }
}
