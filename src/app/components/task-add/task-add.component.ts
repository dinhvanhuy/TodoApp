import { TaskService } from 'src/app/services/task.service';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {NgbDateStruct, NgbCalendar, NgbDate, NgbDateParserFormatter} from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-task-add',
  templateUrl: './task-add.component.html',
  styleUrls: ['./task-add.component.css']
})
export class TaskAddComponent implements OnInit {
  model?: NgbDateStruct;
  date?: {year: number, month: number};
  day!: NgbDate;
  taskForm !: FormGroup;
  constructor(private fb: FormBuilder,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    private calendar: NgbCalendar,
    private taskService: TaskService) { 
  }

  ngOnInit(): void {
   this.innitForm();
  }

  innitForm() {
    this.day =  this.calendar.getToday();
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: '',
      dueDate: this.day,
      piority: 'Normal',
    })
  }

  addTask() {
    if(this.taskForm.invalid) return;
    let task = {...this.taskForm.value};
    task.dueDate = this.ngbDateParserFormatter.format(this.taskForm.controls.dueDate.value);
    this.taskService.addItem(task);
    this.innitForm();
  }

  get f() {
    return this.taskForm.controls;
  }

}
