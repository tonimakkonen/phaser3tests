
"use strict";

// This map is used if we ever add more properties to levels here

var LEVELS = new Map();

LEVELS.set(
  0,
  {
    name: 'Introduction',
    location: 'maps/level0.json'
  }
);

LEVELS.set(
  1,
  {
    name: 'Credits',
    last: true,
    location: 'maps/level0.json'
  }
);


const getJSON = async url => {
  const response = await fetch(url);
  if(!response.ok) throw response.statusText;
  const data = response.json();
  return data;
}

// Start loading levels right away when reading this file
LEVELS.forEach((level, index) => {
  getJSON(level.location).then(data => {
    level.mapBlueprint = data;
    console.log('Loaded level: ' + index);
  }).catch(error => {
    throw 'Failed to load level: ' + error;
  });
});

function levelsAllLoaded() {
  var loaded = true;
  LEVELS.forEach((level, index) => {
    if (level.mapBlueprint == undefined) loaded = false;
  });
  return loaded;
}
