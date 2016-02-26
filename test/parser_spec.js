"use strict";

require("mocha");
var expect = require("chai").expect;
var chai = require("chai");
var fs = require("fs");
var _ = require("underscore");

var Parser = require('../lib/parser.js');

var objectFixture = fs.readFileSync(__dirname + '/fixtures/module.os', 'utf-8');

describe("Parser", function () {
    var parser;
    var list;
    var names;
    var methods;        

    beforeEach(function () {
        parser = new Parser();
        methods = parser.parse(objectFixture).getMethodsTable();
        list = methods.find();
        names = _.pluck(list, 'name');
    });
    
    describe('Должны найти простую функцию', function () {
        beforeEach(function () {
            
        });
        
        it("Парсинг экспортной процедуры", function () {
            expect(names).to.contain("ТестЭкспортФункция");
        });
        
        
    });
    
    describe('Должны найти сложную экспортную функцию', function () {
        var method;
        
        beforeEach(function () {
            method = methods.find(
                {   "isexport":true,
                    "name":"СложнаяФункцияСКучейПараметров"
                }
            )[0];
            
        });
        
        it("Парсинг сложной экспортной процедуры isexport", function () {
            expect(methods.find({"isexport":true}).length).to.equal(2);
        });
        
        it("Функция должна быть иметь 2 параметра _method.Params", function () {
            //console.log(method._method);
            expect(method._method.Params.length).to.equal(2);
        })
        
        it("Функция должна быть иметь 1 вызов _method.Calls", function () {
            expect(method._method.Calls.length).to.equal(2);
        })
        it("Функция должна быть иметь большое описание description", function () {
            expect(method.description.split("\n").length).to.equal(15);
        })
    })
    }
)

