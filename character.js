import Sprite from './sprite.js';

export default class Character {
  constructor(name, health, attack, defense, spriteOptions, team, movementAbility) {
    this.name = name;
    this.maxHealth = health;
    this.health = health;
    this.attack = attack;
    this.defense = defense;
    this.isSelected = false;
    this.team = team;
    this.movementAbility = movementAbility;
    this.sprites = {};
    this.sprites.idle = new Sprite(spriteOptions.idle);
    this.sprites.walk = new Sprite(spriteOptions.walk);
    this.sprites.attack = new Sprite(spriteOptions.attack);
    this.sprites.hurt = new Sprite(spriteOptions.hurt);
    this.sprites.dead = new Sprite(spriteOptions.dead);
    this.currentAnimation = this.sprites.idle;
    this.walkEffect = new Audio();
    this.walkEffect.src = 'https://gamepedia.cursecdn.com/feheroes_gamepedia_en/e/e5/Se_fs_normal_sand_3.flac';
  }

  getCharacterCoordinates() {
    return {
      x: Math.floor(this.currentAnimation.position.x / 120),
      y: Math.floor(this.currentAnimation.position.y / 120)
    };
  }

  getGoalCoordinates() {
    return {
      x: Math.floor(this.currentAnimation.goal.x / 120),
      y: Math.floor(this.currentAnimation.goal.y / 120)
    };
  }

  setWalkAnimation() {
    if (
      this.getCharacterCoordinates().x !== this.getGoalCoordinates().x ||
      this.getCharacterCoordinates().y !== this.getGoalCoordinates().y
    ) {
      this.sprites.walk.position = this.currentAnimation.position;
      this.sprites.walk.goal = this.currentAnimation.goal;
      this.walkEffect.play();
      return (this.currentAnimation = this.sprites.walk);
    }
    this.sprites.walk.position = this.currentAnimation.position;
    this.sprites.walk.goal = this.currentAnimation.goal;
    return (this.currentAnimation = this.sprites.idle);
  }

  setBattleAnimation() {
    this.sprites.attack.position = { x: 100, y: 250 };
  }

  setHurtAnimation() {
    this.sprites.hurt.position = { x: 420, y: 250 };
  }

  isDead() {
    if (this.health <= 0) {
      this.currentAnimation.position = { x: -1, y: -1 };
      return true;
    }
    return false;
  }
}
