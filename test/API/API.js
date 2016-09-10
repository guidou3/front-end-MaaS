import request from 'supertest'
//var express = require('express');
import req from 'superagent'
const api = 'https://mass-demo.herokuapp.com/api/'

//var app = express();

describe('GET /companies/{id}/exists', function() {
  it('respond with {exists:true} if the name of the company is already present', function(done) {
    request('https://mass-demo.herokuapp.com/api/' +'companies/' + 'Guido' + '/exists')
      .get('')
      .set('Accept', 'application/json')
      .expect(200, {exists:true})
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
  it('respond with {exists:false} if the name of the company is already present', function(done) {
    request('https://mass-demo.herokuapp.com/api/' +'companies/' + 'aywdybiadu' + '/exists')
      .get('')
      .set('Accept', 'application/json')
      .expect(200, {exists:false})
      .end(function(err, res) {
        if (err) return done(err);
        done();
      });
  });
});
