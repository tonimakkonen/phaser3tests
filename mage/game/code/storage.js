
"use strict";

function storageLoad() {

  console.log('Local version: ' + VERSION);

  const versionInStorage = localStorage.getItem('version');

  if (!versionInStorage) {
    console.log('No local storage data');
    localStorage.clear();
  } else {
    if (versionInStorage != VERSION) {
      console.log('Wrong version in local storage, clearing: ' + versionInStorage);
      localStorage.clear();
    } else {
      console.log('Loading local storage');
      mapBlueprint =  JSON.parse(localStorage.getItem('mapBlueprint'));
    }
  }
  localStorage.setItem('version', VERSION);
}

function storageSaveMap() {
  console.log('saving map');
  localStorage.setItem('mapBlueprint', JSON.stringify(mapBlueprint));
}
