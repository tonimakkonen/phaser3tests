
"use strict";

var LEVELS = new Map();

LEVELS.set(
  0,
  {
    location: 'maps/level0.json'
  }
);

LEVELS.set(
  1,
  {
    location: 'maps/level1.json'
  }
);

// We load our levels here
// TODO: Make a check when levels are actually loaded

const getJSON = async url => {
  const response = await fetch(url);
  if(!response.ok) throw response.statusText;
  const data = response.json();
  return data;
}

LEVELS.forEach((level, index) => {
  getJSON(level.location).then(data => {
    level.mapBlueprint = data;
  }).catch(error => {
    throw 'Failed to load level: ' + error;
  });
});
