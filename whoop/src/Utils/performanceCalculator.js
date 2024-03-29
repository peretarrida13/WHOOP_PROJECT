import workouts from '../Exercises/Workout.json';

export function calculatePerformance(workout){
    // Constants for maximum values (you need to set these based on your personal records)
    const MaxStrain = 21; // Example value
    const MaxCalories = 2000; // Example value

    // Weights for each component
    const W1 = 0.3; // Weight for Strain
    const W2 = 0.25; // Weight for Heart Rate
    const W3 = 0.25; // Weight for Calories
    const W4 = 0.2; // Weight for Heart Rate Zones

    // Normalizing Strain and Calories
    const normalizedStrain = Math.min((workout.score.strain / MaxStrain) * 10, 10);
    const normalizedCalories = Math.min((Math.floor(workout.score.kilojoule*0.239006) / MaxCalories) * 10, 10); // Assuming kilojoule is equivalent to calories

    // Heart Rate Intensity Score
    const hrIntensityScore = Math.min((workout.score.average_heart_rate / workout.score.max_heart_rate) * 10, 10);

    // Heart Rate Zones Score
    const totalZoneTime = workout.score.zone_duration.zone_five_milli + workout.score.zone_duration.zone_four_milli + workout.score.zone_duration.zone_three_milli + workout.score.zone_duration.zone_two_milli + workout.score.zone_duration.zone_one_milli + workout.score.zone_duration.zone_zero_milli;
    const hrZoneScore = Math.min(((workout.score.zone_duration.zone_five_milli * 5 + workout.score.zone_duration.zone_four_milli * 4 + workout.score.zone_duration.zone_three_milli * 3 + workout.score.zone_duration.zone_two_milli * 2 + workout.score.zone_duration.zone_one_milli * 1) / totalZoneTime) * 10, 10);

    // Calculate final performance score
    const performanceScore = Math.min((W1 * normalizedStrain + W2 * hrIntensityScore + W3 * normalizedCalories + W4 * hrZoneScore), 10);
    
    return Math.floor(performanceScore*100)/100;
}

export function getWorkoutType(id){
    for(let i = 0; i < workouts.length; ++i){
        if(workouts[i].id === id){
            return workouts[i].sport;
        } 
    }

    return "Activity (no recognized Sport)"
}