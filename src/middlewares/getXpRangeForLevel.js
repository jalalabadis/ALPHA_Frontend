export const getXpRangeForLevel=(userXP) =>{
    /////XP অনুযায়ী Level
    let xp = userXP;
    let level = 0;
    let requiredXp = 100; // লেভেল ১ এর জন্য প্রয়োজনীয় xp
    let multiplier = 1.5; // প্রতি লেভেলের জন্য xp এর প্রয়োজনীয়তা বাড়ানোর রেশিও

  
    while (xp >= requiredXp) {
        level++;
        xp -= requiredXp;
        requiredXp = Math.floor(requiredXp * multiplier);
    }
  
      return  level;
  };