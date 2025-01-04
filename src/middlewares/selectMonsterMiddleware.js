import monsters from '../data/monsters.json';

export const selectMonsterMiddleware = (userLuck, userXp) => {
    // Monster list

    // Filter monsters based on conditions
    let selectedMonsters;
    if (userXp === 0) {
        // If userXp is 0, select only monsters with power = 0
        selectedMonsters = monsters.filter(monster => monster.power === 0);
    } else {
        // If userXp is not 0, exclude monsters with power = 0
        const filteredMonsters = monsters.filter(monster => monster.power > 0);

        if (userLuck === 100) {
            // Select monsters with the lowest power
            const minPower = Math.min(...filteredMonsters.map(monster => monster.power));
            selectedMonsters = filteredMonsters.filter(monster => monster.power === minPower);
        } else if (userLuck === 1) {
            // Select monsters with the highest power
            const maxPower = Math.max(...filteredMonsters.map(monster => monster.power));
            selectedMonsters = filteredMonsters.filter(monster => monster.power === maxPower);
        } else {
            // Randomly select any monster from the filtered list
            selectedMonsters = [filteredMonsters[Math.floor(Math.random() * filteredMonsters.length)]];
        }
    }

    // Return the selected monster(s)
    return selectedMonsters[0];
};
