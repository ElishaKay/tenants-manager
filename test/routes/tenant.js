'use strict';
const supertest = require('supertest');
const tenantsApi  = supertest('http://localhost:3000/api/tenants');

describe('/api/tenants/', () => {

	it('should return all existing tenants', function(done) {
		tenantsApi.get('/')
		.expect(200)
		.end((err, res) => {
			if (err) return done(err);
            // console.log(res.body);
            res.body.should.have.property('tenants').and.to.be.instanceof(Array);
            done();
        });
	});

	it('should create new tenant', done => {
		const tenant = {
			name: 'test tenant',
			email: 'testtenant@example.com'
		};

		tenantsApi.post('/')
		.send(tenant)
		.expect(200)
		.end((err, res) => {
			if (err) return done(err);
           // console.log(res.body);
           res.body.should.have.property('message').and.to.be.a('string');
           res.body.should.have.property('success').and.to.be.true;
           done();
       });
	});

	it('should fail to create new tenant if email is not given', done => {
		const tenant = {
			name: 'test tenant',
			email: ''
		};

		tenantsApi.post('/')
		.send(tenant)
		.expect(200)
		.end((err, res) => {
			if (err) return done(err);
		      // console.log(res.body);
		      res.body.should.have.property('message').and.to.be.a('string');
		      res.body.should.have.property('success').and.to.be.false;
		      done();
		  });
	});

	it('should fail to create new tenant if name is not given', done => {
		const tenant = {
			name: '',
			email: 'testtenant@example.com'
		};

		tenantsApi.post('/')
		.send(tenant)
		.expect(200)
		.end((err, res) => {
			if (err) return done(err);
		      // console.log(res.body);
		      res.body.should.have.property('message').and.to.be.a('string');
		      res.body.should.have.property('success').and.to.be.false;
		      done();
		  });
	});

});
