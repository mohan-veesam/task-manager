import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { CommonService } from '../../services/common.service';
import { TaskFormComponent } from './task-form/task-form.component';
import { MatCard } from "@angular/material/card";
import { SharedModule } from "../../shared/shared.module";

@Component({
  selector: 'app-tasks',
  imports: [MatCard, SharedModule],
  templateUrl: './tasks.component.html',
  styleUrl: './tasks.component.css'
})
export class TasksComponent {
 tasks : any[] = [];
  constructor(private dialog : MatDialog, private cs: CommonService){

  }
  displayedColumns: string[] = ['projectName', 'projectCreator','creationDate', 'taskName', 'taskDescription', 'taskstatus', 'actions'];
  
  ngOnInit() {
    this.getAllTasks();
  }
  getAllTasks() {
    this.cs.getAll('tasks').subscribe((res: any) => {
      this.tasks = res;
    });
  }
  

  openForm(data: any = null): void {
    const dialogRef = this.dialog.open(TaskFormComponent, {
      width: '400px',
      data: {
      mode: data ? 'E' : 'A',   // 'E' for Edit, 'A' for Add
      task: data || null
    }
    });

    dialogRef.afterClosed().subscribe((result) => {
      if (result) this.getAllTasks();
    });
  }
  
  deleteTask(id: string): void {
  if (confirm('Are you sure you want to delete this employee?')) {
    this.cs.delete('users', id).subscribe({
      next: (res) => {
        console.log('Delete successful:', res);
        this.getAllTasks(); // Refresh the list
      },
      error: (err) => {
        console.error('Delete failed:', err);
        alert('Failed to delete employee.');
      }
    });
  }
}
}
