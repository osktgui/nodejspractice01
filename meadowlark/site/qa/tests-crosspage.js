var Browser = require('zombie'),
assert = require('chai').assert;

var browser;
describe('Cross-Page Tests', function(){

	before(function(){
		browser = new Browser({ site: 'http://localhost:3000' });
	});

	beforeEach(function(done){
		browser.visit('/tours/hood-river', done);
	});

	it('Load page', function(){
		browser.assert.success();
	});

	it('requesting to group rate quote from the hood river tour page should populate the referrer field', function(done){
		
		browser.clickLink('.requestGroupRate').then(function(){
			// var referrer = 'http://localhost:3000/tours/hood-river';
			var referrer = '';
			assert.equal(browser.field('referrer').value, referrer);
		}).then(done, done);
	});


	it('requesting a group rate from the oregon coast tour page should populate the referrer field', function(done){
		browser.clickLink('.requestGroupRate').then(function(){
			// var referrer = 'http://localhost:3000/tours/oregon-coast';
			var referrer = '';
			browser.assert.input('input[name="referrer"]', referrer);
		}).then(done, done);
	});

	it('visiting the "request group rate" page dircitly should result in an empty referrer field', function(done){
		browser.visit('http://localhost:3000/tours/request-group-rate').then(function(){
			browser.assert.input('input[name="referrer"]', '');
		}).then(done, done);

	}); 

});

// Comando utilizado: mocha qa/tests-crosspage.js 