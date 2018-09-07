'use strict';
const supertest = require('supertest');
const usersApi  = supertest('http://localhost:3000/api/users');

describe('/api/users/', () => {

	it('should return all existing users', function(done) {
		usersApi.get('/')
		.expect(200)
		.end((err, res) => {
			if (err) return done(err);
            // console.log(res.body);
            res.body.should.have.property('users').and.to.be.instanceof(Array);
            done();
        });
	});

	it('should create new user', done => {
		const user = {
			name: 'test user',
			email: 'testuser@example.com'
		};

		usersApi.post('/')
		.send(user)
		.expect(200)
		.end((err, res) => {
			if (err) return done(err);
           // console.log(res.body);
           res.body.should.have.property('message').and.to.be.a('string');
           res.body.should.have.property('success').and.to.be.true;
           done();
       });
	});

	it('should fail to create new user if email is not given', done => {
		const user = {
			name: 'test user',
			email: ''
		};

		usersApi.post('/')
		.send(user)
		.expect(200)
		.end((err, res) => {
			if (err) return done(err);
		      // console.log(res.body);
		      res.body.should.have.property('message').and.to.be.a('string');
		      res.body.should.have.property('success').and.to.be.false;
		      done();
		  });
	});

	it('should fail to create new user if name is not given', done => {
		const user = {
			name: '',
			email: 'testuser@example.com'
		};

		usersApi.post('/')
		.send(user)
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
