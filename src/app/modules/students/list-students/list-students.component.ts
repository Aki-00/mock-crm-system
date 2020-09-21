import { Component, OnInit, ViewChild, ElementRef } from '@angular/core';
import { StudentService} from '../student.service';
import { Student} from '../../../models/student';
import {TableModule} from 'primeng/table';
import { Table } from 'primeng/table';
import {DialogService, DynamicDialogRef} from 'primeng/dynamicdialog';
import { AssignToAdvisorComponent } from '../assign-to-advisor/assign-to-advisor.component';
import {MessageService} from 'primeng/api';
import { AssignStudentComponent } from '../assign-student/assign-student.component';
import Swal from 'sweetalert2';

@Component({ 
  selector: 'app-list-students',
  templateUrl: './list-students.component.html',
  styleUrls: ['./list-students.component.scss'],
  providers:[DialogService, MessageService]
})
export class ListStudentsComponent implements OnInit {

  constructor(private studentService:StudentService, public dialogService:DialogService, public messageService: MessageService) { }

  students:Student[];
  selectedStudents:any[];
  selectedItemsList = [];
  checkedIDs = [];
  cols:any[];
  sources:any[];
  message:string;
  ref1: DynamicDialogRef;
  ref2: DynamicDialogRef;
  @ViewChild('dt') table: Table;
  @ViewChild('fileInput') fileInput;  

  ngOnInit(): void {
    // this.primengConfig.ripple = true;

    this.fetchStudent();
      this.sources =[
        {label:'Email', value:'Email'},
        {label:'Online', value:'Online'},
      ]

      this.cols =[
        // {field:'', header:'No'},
        {field:'lastName', header:'Last Name'},
        {field:'firstName', header:'First Name'},
        {field:'source', header:'Source'},
        {field:'phoneNumber', header:'Phone Number'},
        {field:'targets', header:'Target'},
        {field:'status', header:'Status'},
        {field:'teamName', header:'Team Name'},
      ];
       
  }

  fetchStudent(){
    this.studentService.getStudents().subscribe(res =>{
      this.students=res;
      });
  }

  passID(){
    this.checkedIDs = this.selectedStudents.map(a=>a.phoneNumber);
    console.log(this.checkedIDs)
    this.studentService.setOption('check', this.checkedIDs);
  }
  
  uploadFile() {  
    let formData = new FormData();  
    formData.append('file', this.fileInput.nativeElement.files[0])  
    formData.forEach((value, key) => {
      console.log("key %s: value %s", key, value);
      })
    this.studentService.UploadExcel(formData).subscribe(
      (message:any) => { 
        console.log(message);
        if(message.message=="WARNING"){
          Swal.fire({
            icon: 'warning',
            title: message.message,
            text: message.details,
          })  
        };
        if(message.message=="SUCCESS"){
          Swal.fire({
            icon: 'success',
            title: message.message,
            text: message.details,
          }) 
        };
        this.fetchStudent();
      }, 
      (error) => {
        console.log("err", error.error.message); 
        Swal.fire({
                  icon: 'error',
                  title: 'Oops...',
                  text: error.error.message,
                })  
      });  
  
  }  

showTeamDialog(){
  this.checkedIDs = this.selectedStudents.map(a=>a.phoneNumber);
  this.ref1 = this.dialogService.open(AssignStudentComponent,{
    data:{
      checkedStudent:this.checkedIDs
    },
    header:"Choose a Team",
    width:"70%"
  });
}

showAdvisorDialog(){
  this.passID();
  this.ref2 = this.dialogService.open(AssignToAdvisorComponent,{
    data:{
      checkedStudent:this.checkedIDs
    },
    header:"Choose a Advisor",
    width:"70%"
  });
}
  }
