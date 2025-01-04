export const silverCalculatorMiddleware=(userLevel, power)=>{
    // রেঞ্জের মান অনুযায়ী সিলভার গণনা
    let silverValue;

    if (power === 'HIGH') {
        // High Silver রেঞ্জ (8-10)
        silverValue = (Math.random() * (10 - 8) + 8) * (userLevel * 10);
    } else if (power === 'MEDIUM') {
        // Medium Silver রেঞ্জ (3-4)
        silverValue = (Math.random() * (4 - 3) + 3) * (userLevel * 10);
    } else if (power === 'LOW') {
        // Low Silver রেঞ্জ (1-2)
        silverValue = (Math.random() * (2 - 1) + 1) * (userLevel * 10);
    } else {
        silverValue = 0;
    }

    return silverValue.toFixed();
};
