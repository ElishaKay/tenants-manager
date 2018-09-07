'use strict';

const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;

const TenantSchema   = new Schema({
    name: String,
    email: String,
});

const Tenant = mongoose.model('Tenant', TenantSchema);

module.exports = Tenant;