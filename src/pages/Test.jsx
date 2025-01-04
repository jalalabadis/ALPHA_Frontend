import Phaser from 'phaser';
import React, { useEffect, useRef } from 'react';

function GameFrame({ setCurrentScreen, currentScreen  }) {
  const gameContainer = useRef(null);

  useEffect(() => {
    const config = {
      type: Phaser.AUTO,
      width: 800,
      height: 400,
      parent: gameContainer.current,
      scene: {
        preload: preload,
        create: create,
        update: update
      }
    };

    const game = new Phaser.Game(config);

    let playerXP = 1000;
    let opponentXP = 2000;
    let isPlayerTurn = Math.random() > 0.5; // Random first attacker
    let gameResult = null;

    const playerWeapon = [
      { name: "hammer", power: 200, graphics: "🔨", effect: "😥" },
      { name: "boom", power: 50, graphics: "💣", effect: "😵" }
    ];

    const opponentWeapon = [
      { name: "bow", power: 80, graphics: "🏹", effect: "😥" },
      { name: "cross", power: 90, graphics: "⚔️", effect: "😣" },
      { name: "boom", power: 50, graphics: "💣", effect: "😵" }
    ];

    function preload() {
      this.load.image('player', '/path/to/player.png');
      this.load.image('opponent', '/path/to/opponent.png');
    }

    function create() {
      // Create player and opponent cards
      const player = this.add.sprite(100, 200, 'player').setScale(0.5);
      const opponent = this.add.sprite(700, 200, 'opponent').setScale(0.5);

      // Display initial health
      const playerHealthText = this.add.text(100, 20, `Player XP: ${playerXP}`, { fontSize: '20px', fill: '#fff' });
      const opponentHealthText = this.add.text(600, 20, `Opponent XP: ${opponentXP}`, { fontSize: '20px', fill: '#fff' });

      function attack() {
        if (gameResult) return; // Stop if game is over

        let attacker, target, targetHealthText, weapon;

        if (isPlayerTurn) {
          attacker = player;
          target = opponent;
          weapon = playerWeapon[Math.floor(Math.random() * playerWeapon.length)];
          //direction = 600; // move to opponent
          targetHealthText = opponentHealthText;
        } else {
          attacker = opponent;
          target = player;
          weapon = opponentWeapon[Math.floor(Math.random() * opponentWeapon.length)];
         // direction = -600; // move to player
          targetHealthText = playerHealthText;
        }

        // Create weapon text for animation
        const weaponText = this.add.text(attacker.x, attacker.y, weapon.graphics, { fontSize: '40px' });

        // Animate weapon
        this.tweens.add({
          targets: weaponText,
          y: target.y+10,
          x: target.x,
          rotation: 2 * Math.PI,
          scaleX: 2,              
          scaleY: 2,   
          duration: 1000,
          onComplete: () => {
            weaponText.destroy(); // Remove the weapon text after animation

            // Display effect
            const effectText = this.add.text(target.x, target.y, weapon.effect, { fontSize: '40px' });
            this.time.delayedCall(500, () => {
              effectText.destroy(); // Remove effect after a short delay
            });

            // Update health
            if (isPlayerTurn) {
              opponentXP = Math.max(0, opponentXP - weapon.power);
              targetHealthText.setText(`Opponent XP: ${opponentXP}`);
            } else {
              playerXP = Math.max(0, playerXP - weapon.power);
              targetHealthText.setText(`Player XP: ${playerXP}`);
            }

            // Check game result
            if (opponentXP <= 0) {
              gameResult = 'Win';
              this.add.text(300, 100, 'You Win!', { fontSize: '50px', fill: '#0f0' });
              return;
            } else if (playerXP <= 0) {
              gameResult = 'Lost';
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

    function update() {}

    return () => {
      game.destroy(true);
    };
  }, []);

  return <div ref={gameContainer}></div>;
}

export default GameFrame;
