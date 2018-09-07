'use strict';

const uuid         = require('uuid');
const mongoose     = require('mongoose');
const Schema       = mongoose.Schema;

const TenantSchema   = new Schema({
	id: { type: String, default: uuid },
    name: String,
    email: String,
    phoneNumber: Number,
    address: String,
    debt: 0

});

const Tenant = mongoose.model('Tenant', TenantSchema);

module.exports = Tenant;