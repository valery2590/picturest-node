/** WARNING:
 *  ⚠️ This is meant to be used only for learning propouses
 */

const fs = require('fs');

const getEntities = (jsonPath) => {
  const entities = require(jsonPath);
  return entities;
};

const updateJSON = (jsonPath, newEntities) => {
  const stringifiedEntities = JSON.stringify(newEntities);
  fs.writeFileSync(jsonPath, stringifiedEntities);
};

const persimon = (jsonPath) => {
  return {
    get: (id) => getEntities(jsonPath).find((entity) => entity.id === id),
    all: () => getEntities(jsonPath),
    update: (id, editedObject) => {
      const entities = getEntities(jsonPath);
      let entityToUpdate;
      const filteredEntities = entities.filter((entity) => {
        if (entity.id === id) {
          entityToUpdate = entity;
          return true;
        }
        return false;
      });
      if (filteredEntities.length === entities.length) {
        return entities;
      }
      filteredEntities.push({
        ...entityToUpdate,
        ...editedObject,
        id: editedObject.id,
      });
      updateJSON(jsonPath, filteredEntities);
      return filteredEntities;
    },
    create: (newObject) => {
      const entities = getEntities(jsonPath);
      const ids = entities.map((entity) => entity.id);
      entities.push({ ...newObject, id: Math.max(ids) + 1 });
      updateJSON(jsonPath, entities);
      return entities;
    },
    delete: (id) => {
      const entities = getEntities(jsonPath);
      const filteredEntities = entities.filter((entity) => entity.id === id);
      if (filteredEntities.length === entities.length) {
        return entities;
      }
      updateJSON(jsonPath, filteredEntities);
      return filteredEntities;
    },
  };
};

module.exports = persimon;
