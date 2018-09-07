'use strict';
const express = require('express');
const Tenant    = require('../models/tenant');
const router  = express.Router();

function generateResponse(message, isSuccess) {
	const resData = {
		message: message,
		success: isSuccess
	};

	return resData;
}



router.route('/')

/*
 * Will Return All Existing Tenants.
 */

 .get((req, res) => {

	let resData = {};

 	Tenant.find({}, (err, tenants) => {
 		if (err) return console.log(err);
		resData = generateResponse(undefined, true)
		resData.tenants = tenants;
 		res.json(resData);
 	})

 })

/*
 * Will Create New Tenant.
 */

 .post((req, res) => {

 	const body = req.body;
	console.log('create-tenant post',body);
	let resData = {};

	if ( body && body.name && body.email ) {
		const tenant = new Tenant(body);
		tenant.save((err, tenant) => {
			if (err) return console.log(err);
			// console.log(tenant)
			const message = 'successfully created the new tenant';
			resData = generateResponse(message, true)
			res.json(resData);
		})
	} else {
		const message = 'Bad Request';
		resData = generateResponse(message, false)
		res.json(resData);
	}

})


 router.route('/:tenantId')

/*
 * Will Return Tenant With Id Value tenantId.
 */

 .get((req, res) => {
 	const tenantId = req.params.tenantId;
 	let resData = {};

 	if (tenantId) {
 		Tenant.findOne({ id: tenantId }, (err, tenant) => {
 			if (err) return console.log(err);
 			if (tenant) {
 				resData = generateResponse(undefined, true)
 				resData.tenant = tenant;
 			} else {
 				const message = 'TENANT NOT FOUND';
 				resData = generateResponse(message, false)
 			}
 			res.json(resData);

 		})
 	} else {
 		const message = 'BAD REQUEST: TENANT ID MUST BE PROVIDED';
 		resData = generateResponse(message, false)
 		res.json(resData);
 	}

 })

/*
 * Will Update Tenant Details..
 */ 

 .put((req, res) => {
 	const tenantId = req.params.tenantId;
 	const body = req.body;

 	if ( body && body.name && body.email ) {
 		const query = {id: tenantId};
 		const update = {
 			name: body.name,
 			email: body.email
 		};

 		Tenant.findOneAndUpdate(query, update, (err, tenant) => {
 			if (err) return console.log(err);
 			// Here tenant contains document value befor updating it..
			const message = 'successfully updated';
			const resData = generateResponse(message, true);
			res.json(resData);
		})
 	} else {
 		const message = 'Bad Request';
 		const resData = generateResponse(message, false)
 		res.json(resData);
 	}

 })

/*
 * Will Delete Tenant With Id Value tenantId.
 */

 .delete((req, res) => {
 	const tenantId = req.params.tenantId;

 	if (tenantId) {
 		Tenant.findOneAndRemove({ id: tenantId }, (err, doc) => {
 			if (err) return console.log(err);
 			// console.log(doc)
			const message = `successfully deleted tenant named ${doc.name}`;
 	        const resData = generateResponse(message, true);
 			res.json(resData);
 		})
 	} else {
		const message = `BAD REQUEST: TENANT ID MUST BE PROVIDED`;
 	    const resData = generateResponse(message, false);
 		res.json(resData);
 	}
 })

 module.exports = router;