import { Component,OnInit,  } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TrainingService } from '../training.service';
import { StopTrainingComponent } from './stop-training.component';

@Component({
  selector: 'app-current-training',
  templateUrl: './current-training.component.html',
  styleUrls: ['./current-training.component.scss']
})
export class CurrentTrainingComponent implements OnInit {


  progress = 0;
  timer;

  constructor(
    private dialog: MatDialog,
    private trainingService: TrainingService
  ) { }

  ngOnInit() {
    this.startOrResumeTrimer();
  }

  startOrResumeTrimer() {
    const step = this.trainingService.getRunningExercise().duration / 100 * 1000  // step duration 
    this.timer = setInterval(() => {
      this.progress = this.progress + 1;
      if (this.progress >= 100) {
        this.trainingService.completeExercise();
        clearInterval(this.timer); //Stop timer going beyond 100%
      }
    }, step)
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
      if (result) {
        this.trainingService.cancelExercise(this.progress);
      } 
      else this.startOrResumeTrimer(); // If user click No, resume the timer. As we store timer value in "timer" count will resume 
    });
  }
}
