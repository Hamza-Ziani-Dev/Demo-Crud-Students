import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { StudentsService } from 'src/app/services/students.service';
import { StudentsModel } from './students.module';

@Component({
  selector: 'app-students',
  templateUrl: './students.component.html',
  styleUrls: ['./students.component.css']
})
export class StudentsComponent implements OnInit {
  
  studentobj: StudentsModel = new StudentsModel;
  students : any;

  formValue!: FormGroup;

  btnUpdateShow:boolean = false;
  btnSaveShow:boolean = true;

  constructor(private formBuilder:FormBuilder, private studentsService: StudentsService) { }

  ngOnInit(): void {
    this.formValue = this.formBuilder.group({
      name:[''],
      class:[''],
      email:[''],
      address:[''],
      city:[''],
      password:['']
    })
    this.getStudents();
  }
  // all
  getStudents(){
    this.studentsService.getStudent().subscribe(res => {
      this.students = res;
    })
  }

  // add
  AddStudent(){
    this.studentobj.address = this.formValue.value.address;
    this.studentobj.city = this.formValue.value.city;
    this.studentobj.name = this.formValue.value.name;
    this.studentobj.email = this.formValue.value.email;
    this.studentobj.password = this.formValue.value.password;
    this.studentobj.class = this.formValue.value.class;

    this.studentsService.postStudent(this.studentobj).subscribe({
      next: (v) => {console.log(v)},
      error: (e) => {
      alert("Error")
      console.log(e)},
    complete: () => {
      console.log('complete')
      alert("Data Saved")
      this.getStudents();
      this.formValue.reset();
    } })
  }
  EditStudent(data:any){
    this.formValue.controls['name'].setValue(data.name);
    this.formValue.controls['city'].setValue(data.city);
    this.formValue.controls['address'].setValue(data.address);
    this.formValue.controls['email'].setValue(data.email);
    this.formValue.controls['class'].setValue(data.class);
    this.formValue.controls['password'].setValue(data.password);
    this.studentobj.id = data.id;
    this.UpdateShowBtn();
  }

  UpdateStudent(){
    this.studentobj.address = this.formValue.value.address;
    this.studentobj.city = this.formValue.value.city;
    this.studentobj.name = this.formValue.value.name;
    this.studentobj.email = this.formValue.value.email;
    this.studentobj.password = this.formValue.value.password;
    this.studentobj.class = this.formValue.value.class;
    this.studentsService.putStudent(this.studentobj,this.studentobj.id).subscribe(res => {
      alert("Data Updated");
      this.getStudents();
      this.SaveShowBtn();
    })


  }


  DeleteStudent(data:any){
    this.studentsService.deleteStudent(data.id).subscribe(res => {
      alert("Record Deleted");
      this.getStudents();
    })

  }

  UpdateShowBtn()
  {
    this.btnUpdateShow = true;
    this.btnSaveShow = false;
  }
  SaveShowBtn()
  {
    this.btnUpdateShow = false;
    this.btnSaveShow = true;
  }


}
