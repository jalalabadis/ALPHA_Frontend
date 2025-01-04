import questsText from '../data/quests.json';
export const getUniqueTexts=(id, count)=> {
    if(!id){return false};
    const array = questsText.find(item=>item.id===id);
    const selectedTasks = [];
    const tempArray = [...array.texts]; // Create a copy to avoid modifying the original array
  
    for (let i = 0; i < count; i++) {
      if (tempArray.length === 0) break; // Prevent errors if count exceeds array size
      const randomIndex = Math.floor(Math.random() * tempArray.length);
      selectedTasks.push(tempArray.splice(randomIndex, 1)[0]);
    }
  
    return selectedTasks;
  }