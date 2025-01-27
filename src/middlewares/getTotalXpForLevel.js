export const getTotalXpForLevel = (level) => {
    let requiredXp = 100; // লেভেল ১ এর জন্য প্রয়োজনীয় xp
    let multiplier = 1.5; // প্রতি লেভেলের জন্য xp এর প্রয়োজনীয়তা বাড়ানোর রেশিও
    let totalXp = 0;

    for (let currentLevel = 1; currentLevel <= level; currentLevel++) {
        totalXp += requiredXp;
        requiredXp = Math.floor(requiredXp * multiplier); // প্রতি লেভেলে XP বাড়ানো
    }

    return totalXp;
};
