var fortune = require('../lib/fortune.js');
var expect = require('chai').expect;

describe('fortune cookies tests', function(){
	it('getFortune() should return a fortune', function(){
		expect(typeof fortune.getFortune()).to.equal('string');
	});
});