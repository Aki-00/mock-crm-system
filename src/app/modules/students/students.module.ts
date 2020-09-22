import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';

import { StudentsRoutingModule } from './students-routing.module';
import { ListStudentsComponent } from './list-students/list-students.component';
import { AssignStudentComponent } from './assign-student/assign-student.component';
import { StudentService } from './student.service';
import { AssignToAdvisorComponent } from './assign-to-advisor/assign-to-advisor.component';
import {TableModule} from 'primeng/table';
import {FileUploadModule} from 'primeng/fileupload';
import {DynamicDialogModule} from 'primeng/dynamicdialog';
import {AutoCompleteModule} from 'primeng/autocomplete';



@NgModule({
  declarations: [ListStudentsComponent, AssignStudentComponent, AssignToAdvisorComponent],
  imports: [
    CommonModule,
    StudentsRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    MatAutocompleteModule,
    MatInputModule,
    TableModule,
    FileUploadModule,
    DynamicDialogModule,
    AutoCompleteModule
  ],
  providers:[StudentService],
  entryComponents:[
    AssignToAdvisorComponent,
    AssignStudentComponent
  ]
})
export class StudentsModule { }
