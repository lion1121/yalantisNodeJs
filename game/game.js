class Warrior {
    constructor(name, attackType, hp, minHit, maxHit) {
        this.name = name;
        this.attack = attackType;
        this.hp = hp;
        this.minHit = minHit;
        this.maxHit = maxHit;
    }

    /**
     * Return randomly value between 1-10
     * @Return int
     */
    static randomHit(min, max) {
        return Math.floor(Math.random() * (max - min + 1));
    }
}

class Gladiator extends Warrior {
    constructor(name, attackType, hp, minHit, maxHit) {
        super(name, attackType, hp, minHit, maxHit);
    }

    hit() {
        return Warrior.randomHit(this.minHit, this.maxHit);
    }
}

class Monster extends Warrior {
    constructor(name, attackType, hp, minHit, maxHit) {
        super(name, attackType, hp, minHit, maxHit);
    }

    hit() {
        return Warrior.randomHit(this.minHit, this.maxHit);
    }
}

class Game {

    constructor(firstCharacter, secondCharacter) {
        this.firstCharacter = firstCharacter;
        this.secondCharacter = secondCharacter;
        this.winner = '';
    }

    /**
    * Randomly define who will attack first
    * @return object
    * */
    firstAttackPriority() {
        let opponents = [];
        let params = Object.values(this);
        //Unset empty value from objects array
        params.shift();
        for (let i = 0; i < params.length; i++) {
            opponents.push(params[i]);
        }
        return opponents[Math.floor(Math.random() * opponents.length)];
    }

    start() {
        let firstAttack = this.firstAttackPriority();
        let firstOpponent = (this.firstCharacter.name === firstAttack.name) ? this.firstCharacter : this.secondCharacter;
        let secondOpponent = (this.secondCharacter.name === firstAttack.name) ? this.firstCharacter : this.secondCharacter;
        let firstOpponentHp = firstOpponent.hp;
        let secondOpponentHp = secondOpponent.hp;

        while (firstOpponentHp > 0 && secondOpponentHp > 0) {
            secondOpponentHp = secondOpponentHp - firstOpponent.hit();
            firstOpponentHp = firstOpponentHp - secondOpponent.hit();
            if (firstOpponentHp < 0 || firstOpponentHp === 0) {
                this.winner = secondOpponent.name;
                break;
            } else if (secondOpponentHp < 0 || secondOpponentHp === 0) {
                this.winner = firstOpponent.name;
                break;
            }
        }
    }
}

const gladiator = new Gladiator('Maximus', 'Hammer Punch', 20, 1, 10);
const monster = new Monster('Alient', 'use Nails', 20, 1, 10);
const game = new Game(gladiator, monster);

game.start();
console.log(game.winner);

