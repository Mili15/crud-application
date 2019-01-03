import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormArray } from '@angular/forms';
import { SharedService } from '../service/shared.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  public items = [];
  taskForm: FormGroup;
  constructor(private sharedService: SharedService, private _fb: FormBuilder) { }

  ngOnInit() {
    this.taskForm = this._fb.group({
      taskRows: this._fb.array([])
    });
    this.getTask();
  }

  initTaskRows() {
    return this._fb.group({
      title: ['', Validators.required],
      description: ['', Validators.required]
    })
  }

  addNewRow() {
    const control = <FormArray>this.taskForm.controls['taskRows'];
    control.push(this.initTaskRows());
  }

  deleteRow(index: number) {
    const control = <FormArray>this.taskForm.controls['taskRows'];
    control.removeAt(index);
  }

  getTask() {
    this.taskForm = this._fb.group({
      taskRows: this._fb.array([])
    });
    this.sharedService.getTask().subscribe((response) => {
      this.items = response;
      this.items['documents'].forEach(task => {
        const control = <FormArray>this.taskForm.controls['taskRows'];
        let form = this._fb.group({
          title: [{ value: task['fields']['title']['stringValue'], disabled: true }],
          description: [{ value: task['fields']['description']['stringValue'], disabled: true }],
        });
        control.push(form);
      });
    });
  }

  deleteTask(task) {
    let result = task.split('/');
    this.sharedService.deleteTask(result[result.length - 1]).subscribe((response) => {
      this.items = response;
      this.getTask();
    });
  }

  updateRow(itemrow) {
    if(itemrow.value['title']=='' || itemrow.value['description']=='') {
      return;
    }
    let postBody = {fields: {} };
    postBody.fields['title'] = {stringValue: itemrow.value['title']};
    postBody.fields['description'] = {stringValue: itemrow.value['description']};
    this.sharedService.addTask(postBody).subscribe((response) => {
      this.getTask();
    });
  }
}
