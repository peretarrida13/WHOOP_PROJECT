export function getHRZoneText(workout){
    const maxZone = getMaxHRZone(workout.score.zone_duration);
    
    if(maxZone === 0){
        return {
            title: "Zone 0: Resting or Very Light Activity",
            text: "In Zone 0, the heart rate typically stays under 50% of its maximum. This is a zone of minimal physical exertion, where activities contribute more to recovery than active training. The Rate of Perceived Exertion (RPE) here is 6, indicating no exertion; it's akin to a state of relaxation. Breathing is natural and unlabored, making it easy to engage in free-flowing conversation."
        }
    } else if(maxZone === 1){
        return {
            title: "Zone 1: Light Exertion",
            text: "Zone 1 sees the heart rate at 50-60% of its maximum. The training effect is about building foundational cardiovascular fitness and endurance. The RPE in this zone ranges from 7 to 8, reflecting a very light to light exertion level. Activities feel remarkably easy to maintain, and breathing remains calm and controlled, allowing for effortless conversation. This zone is ideal for warming up the body and easing into more intense activities."
        }
    } else if(maxZone === 2){
        return {
            title: "Zone 2: Moderate Exertion",
            text: "In Zone 2, the heart rate ranges from 60-70% of the maximum. Zone 2 is pivotal for enhancing basic endurance and improving fat-burning efficiency. The RPE falls between 9 and 11, indicating a moderate level of exertion. While the activity is comfortably challenging, breathing is more noticeable, yet it's still possible to speak in complete sentences with occasional pauses for breath."
        }
    } else if(maxZone === 3){
        return {
            title: "Zone 3: Moderately Hard Exertion",
            text: "In Zone 3, the heart rate increases to 70-80% of its maximum. This zone improves aerobic capacity and cardiovascular endurance. The RPE here is between 12 and 14, signifying a moderately hard level of exertion. Breathing becomes deeper and more frequent, and conversations are possible but are now interspersed with more frequent breaths, requiring short sentences."
        }
    } else if(maxZone === 4){
        return {
            title: "Zone 4: Hard Exertion",
            text: "Approaching higher intensity, Zone 4 pushes the heart rate to 80-90% of its maximum. The focus in this zone is on increasing the anaerobic threshold. The RPE here is between 15 and 17, reflecting a hard level of exertion. Breathing is heavy and labored, and speaking is limited to only a few words at a time, as the effort demands more focus and energy."
        }
    } else if(maxZone === 5){
        return {
            title: "Zone 5: Maximal Exertion",
            text: "Zone 5, where the heart rate reaches 90-100% of its maximum, is about maximal exertion. Here, the RPE scales from 18 to 20, the highest on the Borg Scale, indicating a very hard to maximal effort. In this zone, the body operates at its peak capacity, pushing the limits of speed and performance. Breathing is extremely heavy and rapid, making it nearly impossible to speak. This level of exertion is typically unsustainable for long periods, and is reserved for short bursts of high-intensity activities."
        }
    }

    return {title: "", text: ""};
}

export function getMaxHRZone(zoneDuration){
    if(zoneDuration.zone_zero_milli > zoneDuration.zone_one_milli && 
        zoneDuration.zone_zero_milli > zoneDuration.zone_two_milli &&
        zoneDuration.zone_zero_milli > zoneDuration.zone_three_milli &&
        zoneDuration.zone_zero_milli > zoneDuration.zone_four_milli &&
        zoneDuration.zone_zero_milli > zoneDuration.zone_five_milli
    ){
        return 0;
    }
    else if(zoneDuration.zone_one_milli > zoneDuration.zone_zero_milli && 
        zoneDuration.zone_one_milli > zoneDuration.zone_two_milli &&
        zoneDuration.zone_one_milli > zoneDuration.zone_three_milli &&
        zoneDuration.zone_one_milli > zoneDuration.zone_four_milli &&
        zoneDuration.zone_one_milli > zoneDuration.zone_five_milli
    ){
        return 1;
    }
    else if(zoneDuration.zone_two_milli > zoneDuration.zone_one_milli && 
        zoneDuration.zone_two_milli > zoneDuration.zone_zero_milli &&
        zoneDuration.zone_two_milli > zoneDuration.zone_three_milli &&
        zoneDuration.zone_two_milli > zoneDuration.zone_four_milli &&
        zoneDuration.zone_two_milli > zoneDuration.zone_five_milli
    ){
        return 2;
    }
    else if(zoneDuration.zone_three_milli > zoneDuration.zone_zero_milli && 
        zoneDuration.zone_three_milli > zoneDuration.zone_two_milli &&
        zoneDuration.zone_three_milli > zoneDuration.zone_zero_milli &&
        zoneDuration.zone_three_milli > zoneDuration.zone_four_milli &&
        zoneDuration.zone_three_milli > zoneDuration.zone_five_milli
    ){
        return 3;
    }
    else if(zoneDuration.zone_four_milli > zoneDuration.zone_one_milli && 
        zoneDuration.zone_four_milli > zoneDuration.zone_two_milli &&
        zoneDuration.zone_four_milli > zoneDuration.zone_three_milli &&
        zoneDuration.zone_four_milli > zoneDuration.zone_zero_milli &&
        zoneDuration.zone_four_milli > zoneDuration.zone_five_milli
    ){
        return 4;
    }
    else if(zoneDuration.zone_five_milli > zoneDuration.zone_one_milli && 
        zoneDuration.zone_five_milli > zoneDuration.zone_two_milli &&
        zoneDuration.zone_five_milli > zoneDuration.zone_three_milli &&
        zoneDuration.zone_five_milli > zoneDuration.zone_four_milli &&
        zoneDuration.zone_five_milli > zoneDuration.zone_zero_milli
    ){
        return 5;
    }
}


export function calculateTime(workout){
    
}