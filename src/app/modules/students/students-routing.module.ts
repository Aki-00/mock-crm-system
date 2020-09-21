import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListStudentsComponent } from './list-students/list-students.component';
import { AssignStudentComponent} from './assign-student/assign-student.component'
import { AssignToAdvisorComponent } from './assign-to-advisor/assign-to-advisor.component';

const routes: Routes = [
  {
    path:'',
    component:ListStudentsComponent
  },
  {
    path:'assignTeam',
    component: AssignStudentComponent
  },
  {
    path:"assignAdvisor",
    component:AssignToAdvisorComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class StudentsRoutingModule { }
