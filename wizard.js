class Wizard {
    #health;
    #mana;

    constructor(name, health, mana) {
        this.name = name;
        this.#health = health;
        this.#mana = mana;
    }

    getHealth() {
        return this.#health;
    }

    getMana() {
        return this.#mana;
    }

    isDefeated() {
        return this.#health <= 0;
    }

    takeDamage(amount) {
        this.#health = Math.max(0, this.#health - amount);
    }
    useMana(cost) {
        if (this.#mana < cost) {
            return false;
        }
        this.#mana -= cost;
        return true;
    }

    
    castSpell(target) {
        throw new Error("castSpell must be implemented");
    }
}

// ===== Fire Wizard =====
class FireWizard extends Wizard {
    castSpell(target) {
        const manaCost = 20;
        const damage = 30;

        if (!this.useMana(manaCost)) {
            console.log(`${this.name} tried to cast Fireball but has no mana!`);
            return;
        }

        console.log(`${this.name} casts FIREBALL `);
        target.takeDamage(damage);
    }
}

class IceWizard extends Wizard {
    castSpell(target) {
        const manaCost = 15;
        const damage = 20;

        if (!this.useMana(manaCost)) {
            console.log(`${this.name} tried to cast Ice Spike but has no mana!`);
            return;
        }

        console.log(`${this.name} casts ICE SPIKE `);
        target.takeDamage(damage);
    }
}

class Duel {
    constructor(wizard1, wizard2) {
        this.wizard1 = wizard1;
        this.wizard2 = wizard2;
    }

    start() {
        console.log(" Duel Started!");

        let attacker = this.wizard1;
        let defender = this.wizard2;

        while (!attacker.isDefeated() && !defender.isDefeated()) {

            if (!attacker.isDefeated()) {
                attacker.castSpell(defender);
            }

            console.log(`${defender.name} Health: ${defender.getHealth()}`);

            [attacker, defender] = [defender, attacker];
        }

        const winner = this.wizard1.isDefeated() ? this.wizard2 : this.wizard1;

        console.log(` Winner is ${winner.name}`);
    }
}

const wizard1 = new FireWizard("Alaa", 100, 100);
const wizard2 = new IceWizard("Lina", 100, 100);

const duel = new Duel(wizard1, wizard2);
duel.start();