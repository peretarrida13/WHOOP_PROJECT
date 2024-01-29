import workouts from '../Exercises/Workout.json';

function daysBetweenDates(isoDate) {
    const date1 = new Date(isoDate);
    const date2 = new Date();

    const oneDay = 24 * 60 * 60 * 1000; // milliseconds in a day
    const diffInTime = Math.abs(date2 - date1); // difference in milliseconds

    return Math.ceil(diffInTime / oneDay); // rounding up to account for partial days
}

export const getMusclesFromWorkouts = (exercises) => {
    var muscles = [];

    for(let i = 0; i < exercises.length; ++i){
        for(let j = 0; j < workouts.length; ++j){
            if(exercises[i].sport_id === workouts[j].id){
                for(let k = 0; k < workouts[j].muscles.length; ++k){
                    const days = daysBetweenDates(exercises[i].created_at);
                    if(days === 0 || days === 1){
                        workouts[j].muscles[k].frequency = 3;
                    } else if(days === 2){
                        workouts[j].muscles[k].frequency = 2;
                    } else if(days === 3){
                        workouts[j].muscles[k].frequency = 1;
                    } else{
                        workouts[j].muscles[k].frequency = 0;
                    }
                    
                    if(shouldAdd(workouts[j].muscles[k], muscles))muscles.push(workouts[j].muscles[k]);
                }
            }
        }
    }

    return muscles;
}

function shouldAdd(data, array){
    for(let index of array){
        if(index.muscles[0] === data.muscles[0]){
            if(data.frequency > index.frequency) return true
            else return false;
        }
    }

    return true;
}