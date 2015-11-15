'use strict';

//dependencies
var path = require('path');
var expect = require('chai').expect;
var mongoose = require('mongoose');
var BigDecimal = require('big.js');

require(path.join(__dirname, '..', 'index'));

var Schema = mongoose.Schema;
var Product;


describe('BigDecimal Schema Type', function() {

    before(function(done) {
        //product schema
        var ProductSchema = new Schema({
            price: {
                type: Schema.Types.BigDecimal,
                required: true
            }
        });
        Product = mongoose.model('Product', ProductSchema);
        done();
    });

    it('should be loaded into Schema Types', function(done) {
        expect(mongoose.Schema.Types.BigDecimal).to.exist;
        expect(mongoose.Types.BigDecimal).to.exist;
        done();
    });

    it('the type should be a function', function() {
        expect(mongoose.Types.BigDecimal).to.be.a('function');
    });

    it('should have a cast method', function() {
        expect(mongoose.Types.BigDecimal.prototype.cast).to.be.a('function');
    });

    it('should be able to use it as schema type', function(done) {
        var ProductSchema = new Schema({
            price: {
                type: Schema.Types.BigDecimal
            }
        });

        expect(ProductSchema.paths.price.instance).to.be.equal('BigDecimal');

        done();
    });

    it('should be able to set default value to it', function(done) {
        var CarSchema = new Schema({
            price: {
                type: Schema.Types.BigDecimal,
                index: true,
                default: new BigDecimal(12)
            }
        });
        var Car = mongoose.model('Car', CarSchema);
        var car = new Car();

        expect(car.price).to.be.an.instanceof(BigDecimal);

        done();
    });

    it('should be able to set value to it by using setter', function(done) {
        var book = new Product();

        book.price = new BigDecimal(12);

        expect(book.price).to.be.an.instanceof(BigDecimal);

        done();
    });

    it('should be able to set value to it from model constructor', function(done) {

        var book = new Product({
            price: new BigDecimal(12)
        });

        expect(book.price).to.be.an.instanceof(BigDecimal);

        done();
    });

    describe('setting the field and not saving', function() {

        it('should store as a Big.js hash', function() {
            var product = new Product({
                price: new BigDecimal('1221.332')
            });
            expect(product.price.toString()).to.equal(new BigDecimal('1221.332').toString());
        });

        it('should try to cast strings to a big hash', function() {
            var product = new Product({
                price: '1221.332'
            });
            expect(product.price.toString()).to.equal(new BigDecimal('1221.332').toString());
        });

        it('should try to cast integers to a big hash', function() {
            var product = new Product({
                price: 1221
            });
            expect(product.price.toString()).to.equal(new BigDecimal('1221').toString());
        });

        it('should try to cast decimals to a big hash', function() {
            var product = new Product({
                price: 1221.322
            });
            expect(product.price.toString()).to.equal(new BigDecimal('1221.322').toString());
        });

    });

    it('should be able to validate that it is required', function(done) {
        var book = new Product();

        book.validate(function(error) {

            expect(error).to.not.be.null;
            expect(error.name).to.be.equal('ValidationError');

            expect(error.errors.price).to.exist;
            expect(error.errors.price.kind).to.be.equal('required');

            done();
        });
    });

    it('should be able to validate that it is bigdecimal type that is required', function(done) {
        var book = new Product({
            price: 'not big'
        });

        book.validate(function(error) {

            expect(error).to.not.be.null;
            expect(error.name).to.be.equal('ValidationError');

            expect(error.errors.price).to.exist;
            expect(error.errors.price.name).to.be.equal('CastError');
            expect(error.errors.price.kind).to.be.equal('BigDecimal');

            done();
        });
    });

    it('should be able to validate its minimum allowed value', function(done) {
        var HardwareSchema = new Schema({
            price: {
                type: Schema.Types.BigDecimal,
                required: true,
                index: true,
                min: new BigDecimal(4)
            }
        });
        var Hardware = mongoose.model('Hardware', HardwareSchema);

        var hammer = new Hardware();
        hammer.price = new BigDecimal(2);

        hammer.validate(function(error) {
            expect(error).to.not.be.null;
            expect(error.name).to.be.equal('ValidationError');

            expect(error.errors.price).to.exist;
            expect(error.errors.price.name).to.be.equal('ValidatorError');
            expect(error.errors.price.kind).to.be.equal('min');
            done();
        });
    });


    it('should be able to validate its maximum allowed value', function(done) {
        var SoftwareSchema = new Schema({
            price: {
                type: Schema.Types.BigDecimal,
                required: true,
                index: true,
                max: new BigDecimal(4000)
            }
        });
        var Software = mongoose.model('Software', SoftwareSchema);

        var inventory = new Software();
        inventory.price = new BigDecimal(6200);

        inventory.validate(function(error) {

            expect(error).to.not.be.null;
            expect(error.name).to.be.equal('ValidationError');

            expect(error.errors.price).to.exist;
            expect(error.errors.price.name).to.be.equal('ValidatorError');
            expect(error.errors.price.kind).to.be.equal('max');
            done();
        });
    });

    describe('setting the field and saving', function() {

        it('should retrieve the value as a big decimal', function(done) {
            var product = new Product({
                price: 1221.322
            });
            product.save(function(err, product) {
                Product.findOne({
                    _id: product._id
                }, function(err, product) {
                    expect(product.price.toString()).to.equal('1221.322');
                    done();
                });
            });
        });

        it('should allow required validation to be checked before save', function(done) {
            var product = new Product();

            product.save(function(err /*, product*/ ) {
                expect(err.name).to.equal('ValidationError');
                done();
            });
        });

    });

});