import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonService } from '../../../services/common.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';
import { SharedModule } from '../../../shared/shared.module';
import { MatSelectChange } from '@angular/material/select';

@Component({
  selector: 'app-task-form',
  imports: [SharedModule],
  templateUrl: './task-form.component.html',
  styleUrl: './task-form.component.css'
})
export class TaskFormComponent {
    taskForm : FormGroup;
    mode: 'A' | 'E'; 
    roles = [1, 2, 3];
    projects: any[] = [];
    users: any[] = [];
    USERID: string | null ='';

  constructor(public dialogRef: MatDialogRef<TaskFormComponent>, 
  private fb:FormBuilder,private cs: CommonService, 
    @Inject(MAT_DIALOG_DATA) public data: any, private snackBar: MatSnackBar,){
     
    this.mode = data.mode;
    this.taskForm = this.fb.group({
        selectedProject: [data?.selectedProject || '', Validators.required],
        taskAssignedTo : [data?.taskAssignedTo || null, Validators.required],
        taskName: [data?.taskName || '', Validators.required],
        taskDescription: [data?.taskDescription || ''],
        taskstatus: 'To Be Done'
    });
    if (this.mode === 'E' && data.task) {
      // this.taskForm.patchValue(data.task);
        this.taskForm.patchValue({
        selectedProject: data.task.selectedProject?._id || '',
        taskAssignedTo: data.task.taskAssignedTo || null,
        taskName: data.task.taskName || '',
        taskDescription: data.task.taskDescription || '',
        taskstatus: data.task.taskstatus || 'To Be Done'
  });   
    }

  }
  onSubmit() {
  if (this.taskForm.invalid) return;

  const formValue = this.taskForm.value;
  
  if (this.mode === 'E') {
    this.cs
      .put('tasks', this.data.task._id, formValue)
      .subscribe({
        next: () => {
          this.snackBar.open('Task updated successfully!', 'Close', {
          duration: 3000, 
          horizontalPosition: 'center',
          verticalPosition: 'top',
          });
          this.dialogRef.close(true)
        },
        error: (err) => {
          console.error('Update error:', err);
          alert('Failed to update Task. Check backend connection or data.');
        } 
      });
  } else {
    this.cs
      .post('tasks', formValue)
      .subscribe({
        next: () => {
          this.snackBar.open('Task Created successfully!', 'Close', {
          duration: 3000,
          horizontalPosition: 'center',
          verticalPosition: 'top',
          });
          this.dialogRef.close(true)
        },
        error: (err) => {
          console.error('Add error:', err);
          alert('Failed to add Task. Check backend or form data.');
        },
        
      });
  }
  }
  onCancel() {
    this.dialogRef.close();
  }
  ngOnInit() {
    this.USERID = localStorage.getItem('id');
    this.getAllProjects();
  }
  getAllProjects(){
    this.cs.getAll('projects').subscribe({
      next: (res: any) => {
       // this.projects = res.projects;   // ✅ assign projects to array
      this.projects = res.projects.filter((p: any) => p.createdBy.id === this.USERID);
      },
      error: (err) => {
        console.error('Error fetching projects:', err);
      }
    });
  }
  onProjectChange(projectId: string) {
    const selected = this.projects.find((p) => p._id === projectId);
    if (selected) {
      this.users = selected.assignedTo || []; // ✅ assuming `assignedTo` is an array of users
      this.taskForm.patchValue({ taskAssignedTo: '' }); // reset employee select
    }
  }

}
