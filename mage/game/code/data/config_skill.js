
"use strict";

// All the learnable skills are here

const SKILL_AIR_1     = 1;
const SKILL_AIR_2     = 2;

const SKILL_WATER_1   = 11;
const SKILL_WATER_2   = 12;

const SKILL_FIRE_1    = 21;
const SKILL_FIRE_2    = 22;

const SKILL_EARTH_1   = 31;
const SKILL_EARTH_2   = 32;

var SKILLS = new Map();

// Air skills //

SKILLS.set(
  SKILL_AIR_1,
  {
    name: 'Basic air magic',
    help: 'Learn the air punch spell',
    spell: SPELL_AIR_PUNCH,
  }
)

SKILLS.set(
  SKILL_AIR_2,
  {
    name: 'Advanced air magic',
    help: 'Improved usage and defence against air magic',
    needs: SKILL_AIR_1
  }
)

// Water skills //

SKILLS.set(
  SKILL_WATER_1,
  {
    name: 'Basic water magic',
    help: 'Learn the water ball spell',
    spell: SPELL_ICE,
  }
)

SKILLS.set(
  SKILL_WATER_2,
  {
    name: 'Advanced water',
    help: 'Improved usage and defence against water',
    needs: SKILL_WATER_1
  }
)

// Fire skills //

SKILLS.set(
  SKILL_FIRE_1,
  {
    name: 'Basic fire magic',
    help: 'Learn the fire ball spell',
    spell: SPELL_FIRE_BALL,
  }
)

SKILLS.set(
  SKILL_FIRE_2,
  {
    name: 'Advanced fire magic',
    help: 'Improved usage and defence against fire magic',
    needs: SKILL_FIRE_1
  }
)

// Earth skills //

SKILLS.set(
  SKILL_EARTH_1,
  {
    name: 'Basic earth magic',
    help: 'Learn the summon stick spell',
    spell: SPELL_SUMMON_STICK,
  }
)

SKILLS.set(
  SKILL_EARTH_2,
  {
    name: 'Advanced earth magic',
    help: 'Improved usage and defence against earth magic',
    needs: SKILL_EARTH_1
  }
)

// Utils //

function skillGetLearnable(known) {
  var ret = [];
  SKILLS.forEach((skill, key) => {
    if (known.includes(key)) return;
    if (skill.needs && !known.includes(skill.needs)) return;
    ret.push(key);
  });
  return ret;
}
