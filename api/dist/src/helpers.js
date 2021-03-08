"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getValue = exports.setValue = void 0;
const redis = __importStar(require("redis"));
const util_1 = require("util");
const shortid_1 = require("shortid");
const client = redis.createClient();
const hgetall = util_1.promisify(client.hgetall).bind(client);
/* create a hash set in Redis*/
exports.setValue = ((set, data) => __awaiter(void 0, void 0, void 0, function* () {
    yield client.hmset(set, shortid_1.generate(), JSON.stringify(data));
    console.log(`done`);
}));
/* Get all values for a specific set in redis */
exports.getValue = ((set) => __awaiter(void 0, void 0, void 0, function* () {
    const values = yield hgetall(set);
    for (let v in values) {
        values[v] = JSON.parse(values[v]);
    }
    return values == null ? {} : values;
}));
