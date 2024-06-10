import { Component, OnInit } from '@angular/core';
import { Student } from '../../shared/interfaces/student';
import { Class } from '../../shared/interfaces/class';
import { StudentService } from '../../shared/services/student/student.service';
import { ClassService } from '../../shared/services/class/class.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  students: Student[] = [];
  classes: Class[] = [];
  newStudentName: string = '';
  newStudentClassId: number = 1;

  constructor(
    private studentService: StudentService,
    private classService: ClassService
  ) { }

  ngOnInit(): void {
    this.students = this.studentService.getStudents();
    this.classes = this.classService.getClasses();
  }

  addStudent(): void {
    if (this.newStudentName.trim() && this.newStudentClassId) {
      console.log(this.newStudentName.trim(),this.newStudentClassId);
      this.studentService.addStudent(this.newStudentName, this.newStudentClassId);
      this.newStudentName = '';
      this.newStudentClassId = 1;
      this.students = this.studentService.getStudents();
      this.classes = this.classService.getClasses();
    }
  }

  editStudent(id: number): void {
    const newName = prompt('Enter new student name', this.students.find(s => s.id === id)?.name);
    const newClassIdStr = prompt('Enter new class ID', this.students.find(s => s.id === id)?.classId.toString());
    const newClassId = newClassIdStr ? parseInt(newClassIdStr, 10) : null;

    if (newName !== null && newName.trim() && newClassId !== null && !isNaN(newClassId)) {
      this.studentService.updateStudent(id, newName, newClassId);
      this.students = this.studentService.getStudents();
    }
  }

  deleteStudent(id: number): void {
    this.studentService.deleteStudent(id);
    this.students = this.studentService.getStudents();
  }

  getClassName(classId: number): string {
    const cls = this.classes.find(c => c.id === classId);
    return cls ? cls.name : 'Unknown';
  }
}
