export const getMonster = (userData) => {
    const randomDice = Math.floor(Math.random() *90)+1;
    const strength = (userData?.userStats.totalStrength - (userData?.userStats.totalStrength * (randomDice/100))).toFixed();
    const vitality = (userData?.userStats.totalVitality - (userData?.userStats.totalVitality * (randomDice/100))).toFixed();
    const luck = (userData?.userStats.totalLuck - (userData?.userStats.totalLuck * (randomDice/100))).toFixed();

    // Strength অনুযায়ী ড্যামেজ রেঞ্জ এবং আপডেট মূল্য
    const minDamage = strength<=1? 0: Number(strength) + 1;
    const maxDamage = strength<=1? 1: Number(strength) + 2; 

    console.log(maxDamage)

    // Vitality অনুযায়ী স্বাস্থ্য পয়েন্ট এবং আপডেট মূল্য
    const healthPoints = (userData?.userStats.level*100) + (vitality * 25);

    // Luck অনুযায়ী ক্রিটিকাল চ্যান্স এবং আপডেট মূল্য 
    const baseCritChance = 5;
    const critChance = baseCritChance + (luck * 0.1);


    return {
        minDamage,
        maxDamage,
        healthPoints,
        critChance: critChance.toFixed(),
        totalStrength: strength,
        totalVitality: vitality,
        totalLuck: luck
    };


}