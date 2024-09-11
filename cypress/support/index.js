const { addMatchImageSnapshotPlugin } = require('cypress-image-snapshot/plugin');
const xpath = require('cypress-xpath');

module.exports = (on, config) => {
  addMatchImageSnapshotPlugin(on, config);
  on('task', {
    xpath,
  });
};

import 'cypress-visual-regression';
const { addMatchImageSnapshotCommand } = require('cypress-visual-regression');
addMatchImageSnapshotCommand();


Cypress.env('name', 'sayani.pramanik004@gmail.com');

import 'cypress-iframe'
import './commands';
import 'cypress-file-upload/commands';

module.exports = { video: true }