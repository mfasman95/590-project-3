module.exports.Enemy = class Enemy {
  constructor(id, name, challengeRating, health, attack) {
    this.id = id || -1;
    this.name = name || 'enemy_default_name';
    this.challengeRating = challengeRating || 1;
    this.health = health || 1;
    this.attack = attack || 1;
  }
};
