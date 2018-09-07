'use strict';

const tenantsCtrl = require('./tenants');

module.exports = app => {
   app.use('/api/users', tenantsCtrl);
};