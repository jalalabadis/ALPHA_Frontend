// Middleware function to calculate XP reward
export const xpRewardMiddleware =(userLevel, xpPower, quest)=> {
    console.log(userLevel, xpPower, quest)
    // Base XP values for different xpPower levels
    const xpBaseValues = {
        HIGH: 20,
        MEDIUM: 15,
        LOW: 10
    };

    // Validate if xpPower is valid
    if (!xpBaseValues[xpPower]) {
        return 0;
    }

    // Logic to calculate XP increment based on user level and quest count
    // Example logic: increment increases as userLevel goes up
    let xpMultiplier = 1 + (userLevel - 1) * 0.1; // 10% increment per level
    let totalXP = xpBaseValues[xpPower] * xpMultiplier * quest;

    // Adding calculated XP to the request for future processing
    return totalXP>0?totalXP:50;
}
