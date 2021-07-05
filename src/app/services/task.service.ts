import { TaskItem } from './../models/task';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TaskService {
  listTasksSoucre =  new ReplaySubject<TaskItem[]>(1);
  listTasks$ = this.listTasksSoucre.asObservable();
  tasks: TaskItem[] = [];
  constructor() { }

  getAllItems() {
    this.tasks = JSON.parse(localStorage.getItem('Tasks')!) || [];
    this.listTasksSoucre.next(this.tasks)
  }

  addItem(item : TaskItem) {
    this.tasks.push(item);
    this.saveItems();
  }

  updateItem(i: number, task: TaskItem) {
    this.tasks = this.tasks.map((item: any, index: number) => {
     if(i == index) {
      item = {...task}
     }
     return item;
    });
    this.saveItems();
  }

  deleteItem(id: number) {
    this.tasks = this.tasks.filter((item: any, i: number) => i !== id);
    this.saveItems();
  }

  deleteItemSelected(tasksSelected: any) {
    this.tasks = this.tasks.filter((item: any, index: number) => {
      let check =  tasksSelected.findIndex((element: number) => element == index);
      if (check == -1) {
        return item;
      }
    })
    this.saveItems();
  }

  saveItems() {
    this.listTasksSoucre.next(this.tasks);
    localStorage.setItem('Tasks', JSON.stringify(this.tasks));
  }

  getItemById(index: number): TaskItem {
    let tasks = this.tasks.filter((item: any, i: number) => i == index);
    return {...tasks[0]};
  }
}
