import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { StopTrainingComponent } from './stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {

  @Output() trainingExit = new EventEmitter();
  progress = 0;
  timer;

  constructor(
    private dialog: MatDialog
  ) { }

  ngOnInit() {
    this.startOrResumeTrimer();
  }


  startOrResumeTrimer() {
    this.timer = setInterval(() => {
      this.progress = this.progress + 5;
      if (this.progress >= 100) {
        clearInterval(this.timer); //Stop timer going beyond 100%
      }
    }, 1000)
  }

  onStop() {
    clearInterval(this.timer);
    const dialogRef = this.dialog.open(StopTrainingComponent,  {
      data: {
        progress: this.progress
      }
    });
    dialogRef.afterClosed().subscribe(result => {
      console.log(result);
      if (result) this.trainingExit.emit(); // If user click yes emit event. Training comp. will set "ongoingTraining to false"
      else this.startOrResumeTrimer(); // If user click No, resume the timer. As we store timer value in "timer" count will resume 
    });
  }



}
