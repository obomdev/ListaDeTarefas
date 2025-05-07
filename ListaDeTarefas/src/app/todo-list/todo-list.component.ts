import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormsModule, NgForm } from '@angular/forms';

@Component({
  selector: 'app-todo-list',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './todo-list.component.html',
  styleUrl: './todo-list.component.css'
})
export class TodoListComponent implements OnInit {

  taskArray: {taskName: string; isCompleted: boolean} [] = []

  ngOnInit(): void{
    const savedTasks = localStorage.getItem('tasks');
    if (savedTasks){
      this.taskArray = JSON.parse(savedTasks);
    }
  }

  saveToLocalStorage(){
    localStorage.setItem('tasks', JSON.stringify(this.taskArray));

  }
  onSubmit(form: NgForm){
    
    if(form.invalid) return;

    const taskName = form.value.task.trim();
    if(!taskName) return;
    
    this.taskArray.push({
      taskName,
      isCompleted: false
    });
    this.saveToLocalStorage()
    form.reset();
  }

  onDelete(index: number){
    this.taskArray.splice(index, 1);
    this.saveToLocalStorage()
  }

  onCheck(index: number){
    this.taskArray[index].isCompleted = !this.taskArray[index].isCompleted;
    this.saveToLocalStorage()
  }

}
