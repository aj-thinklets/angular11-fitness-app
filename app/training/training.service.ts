import { Subject } from "rxjs";
import { Exercise } from "./exercise.model";


export class TrainingService {

    exerciseChanged = new Subject<Exercise>();
    
    private availableExercise: Exercise[] = [
        { id: 'crunches', name: 'Crunches', duration: 30, calories: 8 },
        { id: 'touch-toes', name: 'Touch Toes', duration: 60, calories: 10 },
        { id: 'side-lunges', name: 'Side Lunges', duration: 90, calories: 15 },
    ]

    private runningExercise: Exercise;
    private exercises: Exercise [] = []
    

    getAvailableExercises() {
        return this.availableExercise.slice(); //slice will create copy of array
    }

    startExercise(selectedId: string) {
        this.runningExercise = this.availableExercise.find (ex => ex.id === selectedId);
        this.exerciseChanged.next({...this.runningExercise});
    }

    completeExercise() {
        this.exercises.push({...this.runningExercise, date: new Date(), state: "completed"});
        this.runningExercise = null;
        this.exerciseChanged.next(null);
    }

    cancelExercise(progress: number) {
        this.exercises.push({
            ...this.runningExercise, 
            date: new Date(), 
            state: "cancalled",
            duration: this.runningExercise.duration * (progress / 100),
            calories: this.runningExercise.calories * (progress / 100),
        });
        this.runningExercise = null;
        this.exerciseChanged.next(null); 
    }

    getRunningExercise() {
        return {...this.runningExercise}
    }

    getCompletedOrCancelledExercises() {
        return this.exercises.slice();
    }

}