// Character Classes
export interface CharacterClass {
  name: string;
  icon: string;
  baseHP: number;
  baseMP: number;
  baseDamage: number;
  baseDefense: number;
  skills: Skill[];
}

export interface Skill {
  name: string;
  icon: string;
  damage?: number;
  defense?: number;
  heal?: number;
  dodge?: boolean;
  lifesteal?: number;
  mpCost: number;
  cooldown: number;
  key: string;
  cooldownRemaining?: number;
}

export interface Player {
  class: string;
  name: string;
  icon: string;
  x: number;
  y: number;
  size: number;
  level: number;
  xp: number;
  xpToLevel: number;
  hp: number;
  maxHP: number;
  mp: number;
  maxMP: number;
  damage: number;
  defense: number;
  speed: number;
  skills: Skill[];
  gold: number;
  attackCooldown: number;
}

export interface Mob {
  name: string;
  icon: string;
  hp: number;
  maxHP: number;
  damage: number;
  xp: number;
  gold: number;
  speed: number;
  x: number;
  y: number;
  size: number;
  targetCooldown: number;
}

export interface Item {
  name: string;
  icon: string;
  type: 'potion' | 'gold' | 'weapon' | 'armor';
  heal?: number;
  mana?: number;
  value?: number;
  damage?: number;
  defense?: number;
}

export interface GameConfig {
  width: number;
  height: number;
  backgroundColor: string;
  physics?: {
    default: string;
    arcade?: {
      gravity: { y: number };
      debug: boolean;
    };
  };
}

export interface WebSocketMessage {
  type: 'reload' | 'update' | 'ping';
  data?: unknown;
}
