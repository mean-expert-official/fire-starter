'use strict'
const mongodbUrl = process.env.MONGODB_URL;

if(mongodbUrl) {
  console.log('Data sources: Using MongoDB config', mongodbUrl)
  module.exports = {
    db: {
      name: 'db',
      connector: 'mongodb',
      url: mongodbUrl,
    },
  }
}
