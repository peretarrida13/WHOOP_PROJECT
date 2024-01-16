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
                    if(workouts[j].muscles[k].frequency - days <= 0){
                        workouts[j].muscles[k].frequency = 0;
                    } else{
                        workouts[j].muscles[k].frequency = workouts[j].muscles[k].frequency - days;
                    }
                    muscles.push(workouts[j].muscles[k]);
                }
            }
        }
    }

  
    
    return muscles;
}