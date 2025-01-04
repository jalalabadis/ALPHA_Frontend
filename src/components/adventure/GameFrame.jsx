import React, { useEffect, useRef, useState } from 'react';
import Phaser from 'phaser';
import WinPopup from './../../popup/WinPopup';
import { getMonster } from '../../middlewares/getMonster';
import fireJson from '../../data/fire.json';

const GameFrame = ({userData, questJourney, onGameEnd}) => {
    const [gameResult, setGameResult]=useState(false);
    const gameContainer = useRef(null);

  useEffect(() => {
   console.log(questJourney)
    const monster = questJourney?.game_type==="adventure"?getMonster(userData):questJourney?.player2;
    let playerHealth = Number(userData.userStats.healthPoints);
    let opponentHealth = monster.healthPoints;
    let isPlayerTurn = Math.random() > 0.5;
    let gameResult = null;


   // Phaser Game Configuration
   const config = {
    type: Phaser.AUTO,
    width: window.innerWidth * 0.7,
    height: window.innerHeight,
    parent: gameContainer.current,  // Attach Phaser to the React component
    scene: {
      preload: preload,
      create: create,
      update: update
    },
    backgroundColor: 'rgba(0, 0, 0, 0)', 
    transparent: true,   
  };

  // Create Phaser Game instance
  const game = new Phaser.Game(config);

    // Preload function
    function preload() {
      // Preload player image
      this.load.image('playerImage', '/assest/img/avatar.jpeg');
      this.load.image('opponentImage', questJourney?.game_type==="adventure"?'/assest/img/Monster.jpg':'/assest/img/avatar.jpeg'); 
      this.load.atlas('flares', 'assest/img/flares.png', fireJson); 

    }

    // Create function
    function create() {
            // Player
            const player = this.add.container(0, 100);
            const playerGraphics = this.add.graphics();
            playerGraphics.fillStyle(0x5B455E82, 0.5);
            playerGraphics.fillRoundedRect(0, 0, 300,  480, 10);
            player.add(playerGraphics);
          
            // Player image inside the profile card
            const playerImg = this.add.image(150, 140, 'playerImage');
            playerImg.setDisplaySize(220, 220);
            player.add(playerImg);
          
            // Mask Player Image
            const maskGraphics = this.add.graphics();
            maskGraphics.fillStyle(0x5B455E82, 1);
            maskGraphics.fillRoundedRect(40, 130, 220, 220, 10);
            const mask = maskGraphics.createGeometryMask();
            playerImg.setMask(mask);
            maskGraphics.setVisible(false);
          
            // Add a border around the player card
            const border = this.add.graphics();
            border.lineStyle(2, 0x000000); 
            border.strokeRoundedRect(40, 30, 220, 220, 10)
            border.setDepth(99);
            player.add(border);



     // Level circle Player
      const levelCircle = this.add.circle(50, 40, 30, 0x5A455D);
      levelCircle.setOrigin(0.5);
      player.add(levelCircle);
      const borderLevel = this.add.graphics();
      borderLevel.lineStyle(2, 0x000000); 
      borderLevel.strokeRoundedRect(20, 10, 60, 60, 50)
      borderLevel.setDepth(99);
       player.add(borderLevel);

      // Level text inside the circle
      const levelText = this.add.text(50, 40, userData?.userStats.level, {
        fontSize: '35px',
        color: '#E0A51D',
        fontFamily: 'MedievalSharp',
        fontWeight: 500,

      }).setOrigin(0.5);
      player.add(levelText);

////Progress
const progressBox = this.add.graphics();
progressBox.fillStyle(0x5B465E, 1);
progressBox.fillRoundedRect(50, 245, 190, 18, 8);
progressBox.lineStyle(2, 0x000000, 1);
progressBox.strokeRoundedRect(50, 245, 190, 18, 8)
const progressBar = this.add.graphics();
progressBar.fillStyle(0x7E2929, 1);
progressBar.fillRoundedRect(51, 247, 190 * 1, 15, 8);
player.add(progressBox);
player.add(progressBar);

// playerHealthText
const playerHealthText = this.add.text(70, 248.5, `${playerHealth}/${userData.userStats.healthPoints}`, { 
  fontSize: '12px',
  color: '#F0DCAE',
  fontFamily: 'MedievalSharp',
  fontWeight: 500,
  textShadow: '-3px 0 #000, 3px 0 #000,  0 -3px #000, 0 3px #000'
});

player.add(playerHealthText);
 
// Create the text for "Strength:"
const strengthLabel = this.add.text(30, 290, 'Strength:', { 
    fontSize: '26px',
    color: '#F0DCAE',
    fontFamily: 'MedievalSharp',
    fontWeight: 500,
    textShadow: '-3px 0 #000, 3px 0 #000,  0 -3px #000, 0 3px #000'
  });
  
  // Create the text for the value "20" and position it 250px to the right of "Strength:"
  const strengthValue = this.add.text(240, 290, userData?.userStats.totalStrength, { 
    fontSize: '26px',
    color: '#F0DCAE',
    fontFamily: 'MedievalSharp',
    fontWeight: 500,
    textShadow: '-3px 0 #000, 3px 0 #000,  0 -3px #000, 0 3px #000'
  });


  // Create the text for "Strength:"
const vitalityLabel = this.add.text(30, 340, 'Vitality:', { 
    fontSize: '26px',
    color: '#F0DCAE',
    fontFamily: 'MedievalSharp',
    fontWeight: 500,
    textShadow: '-3px 0 #000, 3px 0 #000,  0 -3px #000, 0 3px #000'
  });
  
  // Create the text for the value "20" and position it 250px to the right of "Strength:"
  const vitalityValue = this.add.text(240, 340, userData?.userStats.totalVitality, { 
    fontSize: '26px',
    color: '#F0DCAE',
    fontFamily: 'MedievalSharp',
    fontWeight: 500,
    textShadow: '-3px 0 #000, 3px 0 #000,  0 -3px #000, 0 3px #000'
  });
  
    // Create the text for "Strength:"
const luckLabel = this.add.text(30, 390, 'Luck:', { 
    fontSize: '26px',
    color: '#F0DCAE',
    fontFamily: 'MedievalSharp',
    fontWeight: 500,
    textShadow: '-3px 0 #000, 3px 0 #000,  0 -3px #000, 0 3px #000'
  });
  
  // Create the text for the value "20" and position it 250px to the right of "Strength:"
  const luckValue = this.add.text(240, 390, userData?.userStats.totalLuck, { 
    fontSize: '26px',
    color: '#F0DCAE',
    fontFamily: 'MedievalSharp',
    fontWeight: 500,
    textShadow: '-3px 0 #000, 3px 0 #000,  0 -3px #000, 0 3px #000'
  });
  // Add both texts to the card container
  player.add(strengthLabel);
  player.add(strengthValue);
  player.add(vitalityValue);
  player.add(vitalityLabel);
  player.add(luckLabel);
  player.add(luckValue);








  // opponent
  const opponent = this.add.container(590, 100);
  const opponentGraphics = this.add.graphics();
  opponentGraphics.fillStyle(0x5B455E82, 0.5);
  opponentGraphics.fillRoundedRect(0, 0, 300,  480, 10);
  opponent.add(opponentGraphics);

  // opponent image inside the profile card
  const opponentImg = this.add.image(150, 140, 'opponentImage');
  opponentImg.setDisplaySize(220, 220);
  opponent.add(opponentImg);

  // Mask opponent Image
  const maskGraphics2 = this.add.graphics();
  maskGraphics2.fillStyle(0x5B455E82, 1);
  maskGraphics2.fillRoundedRect(630, 130, 220, 220, 10);
  const mask2 = maskGraphics2.createGeometryMask();
  opponentImg.setMask(mask2);
  maskGraphics2.setVisible(false);
  //opponent.add(maskGraphics2);

  // Add a border around the opponent card
  const border2 = this.add.graphics();
  border2.lineStyle(2, 0x000000); 
  border2.strokeRoundedRect(40, 30, 220, 220, 10)
  border2.setDepth(99);
  opponent.add(border2);



// Level circle opponent
const levelCircle2 = this.add.circle(50, 40, 30, 0x5A455D);
levelCircle2.setOrigin(0.5);
opponent.add(levelCircle2);
const borderLevel2 = this.add.graphics();
borderLevel2.lineStyle(2, 0x000000); 
borderLevel2.strokeRoundedRect(20, 10, 60, 60, 50)
borderLevel2.setDepth(99);
opponent.add(borderLevel2);

// Level text inside the circle
const levelText2 = this.add.text(50, 40,  userData?.userStats.level, {
fontSize: '35px',
color: '#E0A51D',
fontFamily: 'MedievalSharp',
fontWeight: 500,

}).setOrigin(0.5);
opponent.add(levelText2);

////Progress
const progressBox2 = this.add.graphics();
progressBox2.fillStyle(0x5B465E, 1);
progressBox2.fillRoundedRect(50, 245, 190, 18, 8);
progressBox2.lineStyle(2, 0x000000, 1);
progressBox2.strokeRoundedRect(50, 245, 190, 18, 8)
const progressBar2 = this.add.graphics();
progressBar2.fillStyle(0x7E2929, 1);
progressBar2.fillRoundedRect(51, 247, 190 * 1, 15, 8);
opponent.add(progressBox2);
opponent.add(progressBar2);


// opponentHealthText
const opponentHealthText = this.add.text(70, 248.5, `${opponentHealth}/${monster.healthPoints}`, { 
  fontSize: '12px',
  color: '#F0DCAE',
  fontFamily: 'MedievalSharp',
  fontWeight: 500,
  textShadow: '-3px 0 #000, 3px 0 #000,  0 -3px #000, 0 3px #000'
});

opponent.add(opponentHealthText);

// Create the text for "Strength:"
const strengthLabel2 = this.add.text(30, 290, 'Strength:', { 
fontSize: '26px',
color: '#F0DCAE',
fontFamily: 'MedievalSharp',
fontWeight: 500,
textShadow: '-3px 0 #000, 3px 0 #000,  0 -3px #000, 0 3px #000'
});

// Create the text for the value "20" and position it 250px to the right of "Strength:"
const strengthValue2 = this.add.text(240, 290, monster.totalStrength, { 
fontSize: '26px',
color: '#F0DCAE',
fontFamily: 'MedievalSharp',
fontWeight: 500,
textShadow: '-3px 0 #000, 3px 0 #000,  0 -3px #000, 0 3px #000'
});


// Create the text for "Strength:"
const vitalityLabel2 = this.add.text(30, 340, 'Vitality:', { 
fontSize: '26px',
color: '#F0DCAE',
fontFamily: 'MedievalSharp',
fontWeight: 500,
textShadow: '-3px 0 #000, 3px 0 #000,  0 -3px #000, 0 3px #000'
});

// Create the text for the value "20" and position it 250px to the right of "Strength:"
const vitalityValue2 = this.add.text(240, 340, monster.totalVitality, { 
fontSize: '26px',
color: '#F0DCAE',
fontFamily: 'MedievalSharp',
fontWeight: 500,
textShadow: '-3px 0 #000, 3px 0 #000,  0 -3px #000, 0 3px #000'
});

// Create the text for "Strength:"
const luckLabel2 = this.add.text(30, 390, 'Luck:', { 
fontSize: '26px',
color: '#F0DCAE',
fontFamily: 'MedievalSharp',
fontWeight: 500,
textShadow: '-3px 0 #000, 3px 0 #000,  0 -3px #000, 0 3px #000'
});

// Create the text for the value "20" and position it 250px to the right of "Strength:"
const luckValue2 = this.add.text(240, 390, monster.totalLuck, { 
fontSize: '26px',
color: '#F0DCAE',
fontFamily: 'MedievalSharp',
fontWeight: 500,
textShadow: '-3px 0 #000, 3px 0 #000,  0 -3px #000, 0 3px #000'
});
// Add both texts to the card container
opponent.add(strengthLabel2);
opponent.add(strengthValue2);
opponent.add(vitalityValue2);
opponent.add(vitalityLabel2);
opponent.add(luckLabel2);
opponent.add(luckValue2);
  
 

// Function to calculate if a critical hit occurs
function isCriticalHit(criticalChance) {
  const randomValue = Math.random(); // Random number between 0 and 1
  return randomValue < criticalChance;
}

function attack() { 
  if (gameResult) return; // Stop if game is over

  let attacker, target, targetHealthText, critChance, baseDamage, totalDamage;

  if (isPlayerTurn) {
    critChance = isCriticalHit(userData.userStats.critChance/100);
    attacker = player;
    target = opponent;
    baseDamage = ((Math.floor(Math.random() * (userData.userStats.maxDamage - userData.userStats.minDamage + 1)) + userData.userStats.minDamage));
    totalDamage = baseDamage*(critChance?2:1);
    targetHealthText = opponentHealthText;
  } else {
    critChance = isCriticalHit(monster.critChance/100);
    attacker = opponent;
    target = player;
    baseDamage = (Math.floor(Math.random() * (monster.maxDamage -monster.minDamage + 1)) + monster.maxDamage).toFixed();
    totalDamage = baseDamage*(critChance?2:1);
    targetHealthText = playerHealthText;
  }

  // Create weapon text for animation
  const flame = this.add.particles(attacker.x, attacker.y, 'flares',
    {
        frame: 'white',
        color: [ 0x040d61, 0xfacc22, 0xf89800, 0xf83600, 0x9f0404, 0x4b4a4f, 0x353438, 0x040404 ],
        colorEase: 'quad.out',
        lifespan: 2400,
        angle: { min: -100, max: -80 },
        scale: { start: 0.3, end: 0, ease: 'sine.out' },
        speed: 100,
        advance: 2000,
        blendMode: 'ADD'
    });
    flame.setAngle(isPlayerTurn?270:90);
  // Animate weapon
  this.tweens.add({
    targets: flame,
    y: target.y+10,
    x: target.x,
    
    scaleX: 2,              
    scaleY: 2,   
    duration: 1000,
    onComplete: () => {
      flame.destroy(); // Remove the weapon text after animation

      // Display effect
      const effectText = this.add.text(target.x+60, target.y+230, -totalDamage, { fontSize: '20px', color: 'red', fontWeight: 'bold' });
      this.time.delayedCall(500, () => {
        effectText.destroy(); // Remove effect after a short delay
      });

      // 2x effect
      if(critChance){
      const effect2X = this.add.text(target.x+60, target.y+200, "2x", { fontSize: '35px', color: 'yellow', fontWeight: 'bold' });
      this.time.delayedCall(500, () => {
        effect2X.destroy(); // Remove effect after a short delay
      });
    }

     // Update health
if (isPlayerTurn) {
  opponentHealth = Math.max(0, opponentHealth - totalDamage);
  targetHealthText.setText(`${opponentHealth}/${monster.healthPoints}`);
  
  // ProgressBar আপডেট করার আগে ক্লিয়ার করা
  progressBar2.clear();
  progressBar2.fillStyle(0x7E2929, 1);// রং আবার সেট করতে হবে কারণ clear() এটা সরিয়ে ফেলে
  progressBar2.fillRoundedRect(51, 247, 190 * (opponentHealth / monster.healthPoints), 15, 8);

 // যদি playerXP এর পরিমাণ ১০% এর কম হয়, তাহলে progressBar হাইড করে দিন
 if ((opponentHealth / monster.healthPoints) < 0.1) {
  progressBar2.setVisible(false);
} else {
  progressBar2.setVisible(true);
}


} else {
  playerHealth = Math.max(0, (isNaN(playerHealth) ? 0 : playerHealth) - totalDamage);
  targetHealthText.setText(`${playerHealth}/${userData.userStats.healthPoints}`);

  // ProgressBar আপডেট করার আগে ক্লিয়ার করা
  progressBar.clear();
  progressBar.fillStyle(0x7E2929, 1);// রং আবার সেট করতে হবে
  progressBar.fillRoundedRect(51, 247, 190 * (playerHealth / userData.userStats.healthPoints), 15, 8);

  // যদি opponentXP এর পরিমাণ ১০% এর কম হয়, তাহলে progressBar হাইড করে দিন
  if ((playerHealth / userData.userStats.healthPoints) < 0.1) {
    progressBar.setVisible(false);
  } else {
    progressBar.setVisible(true);
  }
}


      // Check game result
      if (opponentHealth <= 0) {
        gameResult = 'Win';
        this.add.text(300, 100, 'You Win!', { fontSize: '50px', fill: '#0f0' });
        setGameResult('Win');
        return;
      } else if (playerHealth <= 0) {
        gameResult = 'Lost';
        setGameResult('Lost');
        this.add.text(300, 100, 'You Lost!', { fontSize: '50px', fill: '#f00' });
        return;
      }

      // Switch turn and attack again after delay
      isPlayerTurn = !isPlayerTurn;
      this.time.delayedCall(2000, attack, [], this);
    }
  });
}

// Start the first attack
this.time.delayedCall(2000, attack, [], this);
       
    }

//////update
    function update() {}

      // Cleanup on component unmount
      return () => {
        game.destroy(true);
      };
  }, [userData, questJourney]);

  return (<div
  ref={gameContainer}
  style={{
    width: '100%',
    height: '100%',
    backgroundColor: 'transparent',  // Use `backgroundColor` instead of `background`
  }}
>
{gameResult&& <WinPopup result={gameResult} game_id={questJourney.id} questJourney={questJourney}   onConfirm={onGameEnd}/>}
</div>
  )
};

export default GameFrame;
