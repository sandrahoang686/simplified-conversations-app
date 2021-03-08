"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const conversations_1 = require("./conversations");
const messages_1 = require("./messages");
const thoughts_1 = require("./thoughts");
const router = express_1.default.Router();
router.get('/', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        res.send('OK');
    }
    catch (e) {
        res.status(500).send(e.toString());
    }
}));
/********* CONVERSATIONS ************/
/* View all conversations */
router.get('/conversations', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const convos = yield conversations_1.getConversations();
        res.status(200).send(convos);
    }
    catch (e) {
        res.status(500).send(e.toString());
    }
}));
/* Create new conversation */
router.post(`/conversation`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const startDate = new Date();
        const { title } = req.body;
        const data = { startDate, title };
        yield conversations_1.createConversation(data);
        res.status(200).send({ 'message': `Successfully created ${title}conversation` });
    }
    catch (e) {
        res.status(500).send(e.toString());
    }
}));
/********* MESSAGES ************/
/* View all messages per specific conversation */
router.get(`/conversation/:id/messages`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const msgs = yield messages_1.getMessagesByConvo(req.params.id);
        res.status(200).send(msgs);
    }
    catch (e) {
        res.status(500).send(e.toString());
    }
}));
/* create a new message in specific conversation */
router.post(`/conversation/:id/message`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { text } = req.body;
        const timestamp = new Date();
        yield messages_1.createMessage(req.params.id, { text, timestamp });
        res.status(200).send({ 'message': `Successfully created new message` });
    }
    catch (e) {
        res.status(500).send(e.toString());
    }
}));
/********* THOUGHTS ************/
/* View all thoughts per specific message */
router.get(`/message/:id/thoughts`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const thoughts = yield thoughts_1.getThoughtsByMessage(req.params.id);
        res.status(200).send(thoughts);
    }
    catch (e) {
        res.status(500).send(e.toString());
    }
}));
// /* create a new thought for specific message */
router.post(`/message/:id/thought`, (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { text } = req.body;
        const timestamp = new Date();
        yield thoughts_1.createThought(req.params.id, { text, timestamp });
        res.status(200).send({ 'message': `Successfully created new thought` });
    }
    catch (e) {
        res.status(500).send(e.toString());
    }
}));
exports.default = router;
