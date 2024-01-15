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


export function parseIsoDateWithOffset(isoDateStr, offsetStr) {
    // Parse the ISO date string
    const date = new Date(isoDateStr);

    // Parse the offset string
    const [offsetHours, offsetMinutes] = offsetStr.split(':').map(Number);
    // Convert the offset to minutes (taking care of the sign for the hours)
    const totalOffsetMinutes = (Math.sign(offsetHours) * Math.abs(offsetHours) * 60) + offsetMinutes;

    // Get the time in UTC
    const utcDate = date.getTime() + (date.getTimezoneOffset() * 60000);
    // Apply the offset to get the local time
    const localDate = new Date(utcDate + (totalOffsetMinutes * 60000));

    const pad = (num) => (num < 10 ? '0' + num : num);

    const day = pad(date.getDate());
    const month = pad(date.getMonth() + 1); // getMonth() returns 0-11
    const year = date.getFullYear();
    const hours = pad(date.getHours());
    const minutes = pad(date.getMinutes());
    const seconds = pad(date.getSeconds());

    return `${day}-${month}-${year} ${hours}:${minutes}:${seconds}`;

}


export function getStrainInformation(strain){
    if(0 <= strain && strain <= 4.2){
        return {
            title: "Very Low Strain", 
            text: "At this level, the engagement in physical activity is minimal, akin to rest or very light activities. It is perfect for days off from rigorous training or for individuals who are just starting out on their fitness journey. The activities should be gentle and easygoing, like a slow walk or light stretching, ensuring that the body isn't taxed. The physical impact at this level is negligible, with little to no noticeable increase in heart rate and energy expenditure. This strain level is ideal for recovery, coinciding with rest days or very light activity days, helping the body recover from more intense training sessions earlier in the week."
        };
    }
    else if(4.2 < strain && strain <= 8.4){
        return {
            title: "Low Strain", 
            text: "This strain level indicates light physical activity. It's suitable for active recovery days and maintaining a baseline level of fitness. Engaging in light sports activities, such as a relaxed swim, a gentle bike ride, or a leisurely walk, helps in keeping up a consistent level of physical activity without overexerting the body. The physical impact includes a slight elevation in heart rate but is manageable and sustainable for extended periods. Activities in this range contribute to loosening muscles, improving blood circulation, and aiding in overall recovery."
        };
    }
    else if(8.4 < strain && strain <= 12.6){
        return {
            title: "Moderate Strain", 
            text: "Moderate strain represents a more engaged level of physical activity. It involves regular, sustained sports activities that are integral to improving overall fitness and endurance. Examples include running at a comfortable pace, engaging in moderate cycling sessions, or playing a casual game of sports like tennis or basketball. The physical impact at this level is more noticeable, with a moderate increase in heart rate and endurance being tested. While this level of activity requires some rest and proper nutrition post-activity for recovery, it generally does not induce severe fatigue."
        };
    }
    else if(12.6 < strain && strain <= 16.8){
        return {
            title: "High Strain", 
            text: "High strain is indicative of engaging in high-intensity physical activities. This level involves more challenging and demanding sports activities, such as competitive games, intense cycling sessions, rigorous swimming, or advanced fitness classes. The goal at this level is to push physical limits, improve performance, and build strength and stamina. The physical impact is significant, with a substantial increase in heart rate and stamina demand. Adequate rest and recovery strategies post-exercise become crucial to avoid overtraining and potential injury."
        };
    } else if(16.8 < strain){
        return {
            title: "Very High Strain", 
            text: "At this extreme level of strain, the physical exertion is intense and prolonged. It is typically reserved for intense sports activities, competitive events like marathons, triathlons, or high-level athletic competitions. This is the domain where athletes push their boundaries to the maximum, challenging both their strength and endurance to the fullest. The physical impact is considerable, putting the body under significant stress. Such high levels of strain necessitate an extensive recovery period. This level of activity should be approached with caution and is generally reserved for well-trained, experienced athletes."
        };
    }
}


export function getAverageHRInformation(avgHR){
    console.log(avgHR)

    if(0 <= avgHR && avgHR <= 60){
        return {
            title: "Resting Zone", 
            characterisitcs: "Below the typical resting heart rate for most adults. Indicative of a state of complete rest or minimal activity.",
            PE:"Very minimal cardiovascular strain and energy expenditure. Ideal for recovery and tissue repair."
        };
    }
    else if(60 < avgHR && avgHR <= 100){
        return {
            title: "Light Activity Zone", 
            characterisitcs: " Slightly above resting levels, indicating a very low level of exertion.",
            PE:"Slight increase in heart rate and breathing, low stress on the cardiovascular system. Useful for basic endurance and recovery."
        };
    }
    else if(100 < avgHR && avgHR <= 140){
        return {
            title: "Moderate Activity Zone", 
            characterisitcs: "Represents moderate-intensity exertion. Sustainable and comfortable for extended periods.",
            PE:" Noticeable increase in breathing and sweating. Effective for general health improvements and weight management."
        };
    }
    else if(140 < avgHR && avgHR <= 180){
        return {
            title: "Vigorous Activity Zone", 
            characterisitcs: "High-intensity exertion, challenging and invigorating.",
            PE:"Rapid breathing and heavy sweating, significant calorie burn. Enhances cardiovascular and respiratory health."

        };
    }
    else if(181 <= avgHR){
        return {
            title: "Maximum Effort Zone", 
            characterisitcs: "Near or at maximum heart rate capacity, typically sustainable only for brief periods.",
            PE:"Extreme levels of exertion, high stress on the cardiovascular system. Improves speed and power in advanced fitness regimens.",
        };
    }

}


export function getCaloriesReport(calories){
    if(0 <= calories && calories <= 200){
        return {
            indication:"Ideal for beginners, recovery days, or as a warm-up/cool-down.",
            goal: "Suitable for general well-being and active recovery rather than significant fitness improvements or weight loss."
        };
    } else if(200 < calories && calories <= 400){
        return{
            indication:" Good for maintaining general fitness, light weight management, and cardiovascular health.",
            goal: "Aligns with moderate fitness goals, including gradual weight loss or maintaining current fitness levels."
        };
    } else if(400 < calories && calories <=600){
        return{
            indication:" Indicates a good level of fitness and the ability to sustain moderately high intensity over the workout duration.",
            goal: " Effective for more aggressive weight loss goals, improving cardiovascular endurance, and overall fitness improvement."
        };
    } else if(600 < calories && calories <= 1000){
        return{
            indication:"Reflects a high level of fitness, endurance, and the ability to sustain prolonged, intense exercise.",
            goal: " Ideal for endurance training, significant weight loss goals, and advanced fitness objectives."
        };
    } else if(1000 < calories && calories <= 2000){
        return{
            indication:"Suggests elite athletic training and a very high level of endurance and fitness.",
            goal: "Aligns with professional or semi-professional athletic training, extreme endurance events preparation, and intensive fitness challenges."
        };
    }
}