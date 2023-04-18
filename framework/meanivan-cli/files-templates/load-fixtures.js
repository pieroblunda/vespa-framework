'use strict';
var content = [
  {
    "name": "structure",
    "value": {
      "backgroundColor": "#FFFFFF",
      "backgroundImage": null,
      "backgroundCover": true,
      "spacingBetween": false,
      "spacing": 25,
      "width": 600
    }
  }
];

module.exports = {
  init: function(db) {
    db.collection('collection-name').remove(function() {
      db.collection('collection-name').insert(content);
      console.log('✓ Cargados en la base de datos');
    });
  }
};