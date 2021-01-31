import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Exercise } from '../exercise.model';
import { TrainingService } from '../training.service';

@Component({
  selector: 'app-past-training',
  templateUrl: './past-training.component.html',
  styleUrls: ['./past-training.component.scss']
})
export class PastTrainingComponent implements OnInit, AfterViewInit {

  dataSource =  new MatTableDataSource<Exercise>();
  displayedColumns = [
    'date', 'name', 'calories', 'duration', 'state'
  ]

  @ViewChild(MatSort) sort: MatSort;


  constructor(
    private trainingService: TrainingService
  ) { }

  ngOnInit( ) {
    this.dataSource.data = this.trainingService.getCompletedOrCancelledExercises();
  }

  ngAfterViewInit() {
    this.dataSource.sort = this.sort;
  }

  doFilter(filterValue:string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
    
  }



}
