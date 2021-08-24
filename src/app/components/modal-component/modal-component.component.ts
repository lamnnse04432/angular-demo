import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {QuestionComponentComponent} from '../question-component/question-component.component';

@Component({
  selector: 'app-modal-component',
  templateUrl: './modal-component.component.html',
  styleUrls: ['./modal-component.component.scss']
})
export class ModalComponentComponent implements OnInit {

  modalForm: FormGroup;
  title: string;
  nameButton: string;

  constructor(private fb: FormBuilder,
              private dialogRef: MatDialogRef<QuestionComponentComponent>,
              @Inject(MAT_DIALOG_DATA) private data: { type: number, content: string }
  ) {
  }

  ngOnInit(): void {
    let contentInput = '';
    if (this.data.type === 1) {
      this.title = 'NEW QUESTION';
      this.nameButton = 'Ask';
    } else {
      if (this.data.content) {
        contentInput = this.data.content;
      }
      this.title = 'NEW Answer';
      this.nameButton = 'Answer';
    }
    this.modalForm = this.fb.group({
      content: contentInput
    });
  }

  onSubmit() {
    this.dialogRef.close(this.modalForm.value);
  }

  onCloseCancel() {
    this.dialogRef.close();
  }
}
