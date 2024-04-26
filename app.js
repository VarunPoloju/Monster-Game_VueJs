function getRandomValue(max, min) {
  return Math.floor(Math.random() * (max - min)) + min;
}
const app = Vue.createApp({
  data() {
    return {
      monsterHealth: 100,
      playerHealth: 100,
      currentround: 0,
      winner: null, //null treats as false in js
      logMessages: [],
    };
  },

  computed: {
    monsterBarStyles() {
      if (this.monsterHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.monsterHealth + "%" };
    },
    playerBarStyles() {
      if (this.playerHealth < 0) {
        return { width: "0%" };
      }
      return { width: this.playerHealth + "%" };
    },
    mayUseSpecialAttack() {
      return this.currentround % 3 !== 0;
    },
  },

  watch: {
    playerHealth(playrHealth) {
      if (playrHealth <= 0 && this.monsterHealth <= 0) {
        // A draw
        this.winner = "draw";
      } else if (playrHealth <= 0) {
        //player lost
        this.winner = "monster";
      }
    },
    monsterHealth(monstrHealth) {
      //in watchrs w eget value parameter u can name whatever u want either value or monstrHealt etc etc
      if (monstrHealth <= 0 && this.playerHealth <= 0) {
        // A draw
        this.winner = "draw";
      } else if (monstrHealth <= 0) {
        //monster lost
        this.winner = "player";
      }
    },
  },

  methods: {
    startNewGame() {
      // we need to reset all the values here
      (this.playerHealth = 100),
        (this.monsterHealth = 100),
        (this.winner = null);
      this.currentround = 0;
      this.logMessages = [];
    },
    attackMonster() {
      //u are attacking monster here
      this.currentround++;
      const attackVal = getRandomValue(12, 5);
      this.monsterHealth = this.monsterHealth - attackVal;
      this.addLogMessage("player", "attacked", attackVal);
      this.attackPlayer();
    },

    attackPlayer() {
      //monster is attacking u here
      const attackVal = getRandomValue(15, 8);
      this.playerHealth = this.playerHealth - attackVal;
      this.addLogMessage("monster", "attacked", attackVal);
    },
    specialAttackMonster() {
      this.currentround++;
      const attackVal = getRandomValue(10, 25);
      this.monsterHealth = this.monsterHealth - attackVal;
      this.addLogMessage("player", "Special-attacked", attackVal);
      this.attackPlayer();
    },
    healPlayer() {
      this.currentround++;
      const healVal = getRandomValue(8, 20);
      if (this.playerHealth + healVal > 100) {
        this.playerHealth = 100;
      } else {
        this.playerHealth = this.playerHealth + healVal;
      }
      this.addLogMessage("player", "heal", healVal);
      this.attackPlayer();
    },

    surrender() {
      this.winner = "monster";
    },
    addLogMessage(who, what, value) {
      // value = how much damage happened
      //unshift - adds new mssage at the top of the array
      this.logMessages.unshift({
        actionBy: who,
        actionType: what,
        actionVal: value,
      });
    },
  },
});

app.mount("#game");
