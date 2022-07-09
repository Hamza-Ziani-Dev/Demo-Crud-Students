import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs';


@Injectable({
  providedIn: 'root'
})
export class StudentsService {

  constructor( private _http: HttpClient) { }

  // Post Method For Add Student
  postStudent(data:any)
  {
    return this._http.post<any>("http://localhost:5000/students",data).pipe(map((res:any)=> {
      return res
    }))
  }

    // Get Method For All Student
    getStudent()
    {
      return this._http.get<any>("http://localhost:5000/students").pipe(map((res:any)=> {
        return res
      }))
    }

      // Put Method For Update Student
  putStudent(data:any, id:number)
  {
    return this._http.put<any>("http://localhost:5000/students/" + id,data).pipe(map((res:any)=> {
      return res
    }))
  }

  // Delete Method For Update Student
  deleteStudent(id:number)
  {
    return this._http.delete<any>("http://localhost:5000/students/" + id).pipe(map((res:any)=> {
      return res
    }))
  }

}
