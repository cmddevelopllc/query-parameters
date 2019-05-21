"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var mocha_typescript_1 = require("mocha-typescript");
var chai_1 = require("chai");
var _1 = require("./");
var Tester = /** @class */ (function () {
    function Tester() {
    }
    Tester.prototype.generalParse = function () {
        var parser = new _1.MongooseQueryParser();
        var qry = 'date=2016-01-01&boolean=true&integer=10&regexp=/foobar/i&null=null';
        var parsed = parser.parse(qry);
        chai_1.assert.isNotNull(parsed.filter);
        chai_1.assert.isOk(parsed.filter['date'] instanceof Date);
        chai_1.assert.isOk(parsed.filter['boolean'] === true);
        chai_1.assert.isOk(parsed.filter['integer'] === 10);
        chai_1.assert.isOk(parsed.filter['regexp'] instanceof RegExp);
        chai_1.assert.isOk(parsed.filter['null'] === null);
    };
    Tester.prototype.generalParse2 = function () {
        var parser = new _1.MongooseQueryParser();
        var predefined = {
            vip: { name: { $in: ['Google', 'Microsoft', 'NodeJs'] } },
            sentStatus: 'sent'
        };
        var parsed = parser.parse('${vip}&status=${sentStatus}&timestamp>2017-10-01&author.firstName=/john/i&limit=100&skip=50&sort=-timestamp&select=name&populate=children', predefined);
        chai_1.assert.isOk(parsed.filter['status'] === predefined.sentStatus);
        chai_1.assert.isOk(parsed.filter['name'].$in.length === 3); // checking parsing of ${vip}
        chai_1.assert.isOk(parsed.filter['timestamp']['$gt'] instanceof Date);
        chai_1.assert.isOk(parsed.filter['author.firstName'] instanceof RegExp);
        chai_1.assert.isOk(parsed.limit === 100);
        chai_1.assert.isOk(parsed.skip === 50);
        chai_1.assert.isNotNull(parsed.sort);
        chai_1.assert.isNotNull(parsed.select);
        chai_1.assert.isNotNull(parsed.populate);
    };
    Tester.prototype.populateParse = function () {
        return __awaiter(this, void 0, void 0, function () {
            var parser, qry, parsed;
            return __generator(this, function (_a) {
                parser = new _1.MongooseQueryParser();
                qry = '_id=1&populate=serviceSalesOrders,customer.category,customer.name';
                parsed = parser.parse(qry);
                chai_1.assert.isOk(parsed.populate.length === 2);
                return [2 /*return*/];
            });
        });
    };
    Tester.prototype.builtInCastersTest = function () {
        var parser = new _1.MongooseQueryParser();
        var qry = 'key1=string(10)&key2=date(2017-10-01)&key3=string(null)';
        var parsed = parser.parse(qry);
        chai_1.assert.isOk(typeof parsed.filter['key1'] === 'string');
        chai_1.assert.isOk(parsed.filter['key2'] instanceof Date);
        chai_1.assert.isOk(typeof parsed.filter['key3'] === 'string');
    };
    Tester.prototype.parseCaster = function () {
        var parser = new _1.MongooseQueryParser({ casters: { $: function (val) { return '$' + val; } } });
        var qry = '_id=$(1)';
        var parsed = parser.parse(qry);
        chai_1.assert.equal('$1', parsed.filter['_id']);
    };
    Tester.prototype.parseJsonFilter = function () {
        var parser = new _1.MongooseQueryParser();
        var obj = {
            $or: [
                { key1: 'value1' },
                { key2: 'value2' }
            ]
        };
        var qry = "filter=" + JSON.stringify(obj) + "&name=Google";
        var parsed = parser.parse(qry);
        chai_1.assert.isArray(parsed.filter['$or']);
        chai_1.assert.isOk(parsed.filter['name'] === 'Google');
    };
    Tester.prototype.parsePredefined = function () {
        var parser = new _1.MongooseQueryParser();
        var preDefined = {
            isActive: { status: { $in: ['In Progress', 'Pending'] } },
            vip: ['KFC', 'Google', 'MS'],
            secret: 'my_secret',
            mykey: 'realkey'
        };
        // test predefined query as key
        var qry = '${isActive}&name&${mykey}=1';
        var parsed = parser.parse(qry, preDefined);
        chai_1.assert.isNotNull(parsed.filter['status']);
        chai_1.assert.isOk(!parsed.filter['${isActive}']);
        chai_1.assert.isOk(parsed.filter['realkey'] === 1);
        // test predefined query as value
        qry = 'secret=${secret}';
        parsed = parser.parse(qry, preDefined);
        chai_1.assert.isOk(parsed.filter['secret'] === preDefined.secret);
        // test predefined query in json
        qry = 'filter={"$and": ["${isActive}", {"customer": "VDF"}]}';
        parsed = parser.parse(qry, preDefined);
        chai_1.assert.isNotNull(parsed.filter['$and'][0].status);
    };
    __decorate([
        mocha_typescript_1.test('should parse general query'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Tester.prototype, "generalParse", null);
    __decorate([
        mocha_typescript_1.test('should parse query with string templates'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Tester.prototype, "generalParse2", null);
    __decorate([
        mocha_typescript_1.test('should parse populate query'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", Promise)
    ], Tester.prototype, "populateParse", null);
    __decorate([
        mocha_typescript_1.test('should parse built in casters'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Tester.prototype, "builtInCastersTest", null);
    __decorate([
        mocha_typescript_1.test('should parse custom caster'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Tester.prototype, "parseCaster", null);
    __decorate([
        mocha_typescript_1.test('should parse json filter'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Tester.prototype, "parseJsonFilter", null);
    __decorate([
        mocha_typescript_1.test('should parse predefined query objects'),
        __metadata("design:type", Function),
        __metadata("design:paramtypes", []),
        __metadata("design:returntype", void 0)
    ], Tester.prototype, "parsePredefined", null);
    Tester = __decorate([
        mocha_typescript_1.suite('Tester')
    ], Tester);
    return Tester;
}());
//# sourceMappingURL=test.spec.js.map