import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NgbCalendar, NgbDate, NgbDateParserFormatter, NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { TaskService} from 'src/app/services/task.service';
import { TaskItem } from 'src/app/models/task';

@Component({
  selector: 'app-task-edit',
  templateUrl: './task-edit.component.html',
  styleUrls: ['./task-edit.component.css']
})
export class TaskEditComponent implements OnInit {
  date?: {year: number, month: number};
  taskForm !: FormGroup;
  taskItem: any;
  today!: NgbDate;
  @Input() id!: number;
  @Output() isShow = new EventEmitter<boolean>();
  constructor(private fb: FormBuilder,
    private ngbDateParserFormatter: NgbDateParserFormatter,
    private taskService: TaskService,
    private calendar: NgbCalendar) { 
  }

  ngOnInit(): void {
    this.today = this.calendar.getToday();
    this.taskForm = this.fb.group({
      title: ['', Validators.required],
      description: '',
      dueDate: '',
      piority: '',
    });

    this.taskItem = this.taskService.getItemById(this.id);
    let dueDate = new Date(this.taskItem.dueDate);
    const date: NgbDate = new NgbDate(dueDate.getFullYear(), dueDate.getMonth() + 1,dueDate.getDate());  
    this.taskForm.patchValue(this.taskItem);
    this.taskForm.controls.dueDate.setValue(date);
    this.taskForm.controls.piority.setValue(this.taskForm.controls.piority.value);
   
  }

  updateTask() {
    if(this.taskForm.invalid) return;
    let task = {...this.taskForm.value};
    console.log(this.taskForm.controls.dueDate.value);
    task.dueDate = this.ngbDateParserFormatter.format(this.taskForm.controls.dueDate.value);
    this.taskService.updateItem(this.id, task);
    this.taskForm.reset();
    this.isShow.emit(false);
  }
  
  get f() {
    return this.taskForm.controls;
  }
  

}
