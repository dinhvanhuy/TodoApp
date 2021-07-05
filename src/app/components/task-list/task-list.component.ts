import { Component, Input, OnInit } from '@angular/core';
import { TaskService } from 'src/app/services/task.service';
import { TaskItem } from 'src/app/models/task';
import { FormControl } from '@angular/forms';
import { debounceTime } from 'rxjs/operators';
@Component({
  selector: 'app-task-list',
  templateUrl: './task-list.component.html',
  styleUrls: ['./task-list.component.css']
})
export class TaskListComponent implements OnInit {
  tasks: any;
  isShow = false;
  selectedItem = 0;
  arraySelectedItem = [] as any;
  searchName = new FormControl();
  showRemoveAll = false;
  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.tasks  = this.taskService.getAllItems();
    this.taskService.listTasks$.subscribe((listTasks: any)=> {
      this.tasks = listTasks;
      this.isShow = false;
      this.showRemoveAll = false;
      this.sortData();
    });

    this.searchName.valueChanges.pipe(debounceTime(500)).subscribe((value) => {
      this.tasks  = this.taskService.tasks;
      this.tasks = this.tasks.filter((item: any) => {
         if (item["title"].search(value) > -1) {
           return item;
         }
         return null;
      })
    })
  }

  getDetail(index : number) {
    this.isShow = !this.isShow;
    this.selectedItem = index;
  }

  removeTask(index: number) {
    this.taskService.deleteItem(index);
  }

  handleEdit(isShow: boolean) {
    this.isShow = isShow;
  }
  
  removeItemSelected() {
    this.taskService.deleteItemSelected(this.arraySelectedItem);
  }

  sortData() {
    return this.tasks.sort((a: TaskItem, b: TaskItem) => {
      return new Date(a.dueDate).getTime() - new Date(b.dueDate).getTime();
    });
  }

  onCheckboxChange(e: any) {
    let index = e.target.value;
    if (e.target.checked) {
      this.arraySelectedItem = [...this.arraySelectedItem, index];
    } else {
      this.arraySelectedItem = this.arraySelectedItem.filter((item: number) => item != index);
    }

    if(this.arraySelectedItem.length == 0) {
      this.showRemoveAll = false;
    } else {
      this.showRemoveAll = true;
    }
   
  }

}


