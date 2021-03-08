import express, { Router, Request, Response } from "express";
import { Conversations, Messages, Thoughts } from './types';
import { createConversation, getConversations } from './conversations';
import { createMessage, getMessagesByConvo } from './messages';
import { createThought, getThoughtsByMessage } from './thoughts';

const router: Router = express.Router();

router.get('/', async (req: Request, res: Response) => {
    try {
        res.send('OK');
    } catch (e) {
        res.status(500).send(e.toString());
    }
});

/********* CONVERSATIONS ************/

/* View all conversations */
router.get('/conversations', async (req: Request, res: Response) => {
    try {
        const convos = await getConversations();
        res.status(200).send(convos);
    } catch (e) {
        res.status(500).send(e.toString());
    }
});

/* Create new conversation */
router.post(`/conversation`, async (req: Request, res: Response) => {
    try {
        const startDate: Date = new Date();
        const { title } = req.body;
        const data: Conversations = {startDate, title};
        await createConversation(data);
        res.status(200).send({'message': `Successfully created ${title}conversation`});
    } catch (e) {
        res.status(500).send(e.toString());
    }
});

/********* MESSAGES ************/

/* View all messages per specific conversation */
router.get(`/conversation/:id/messages`, async (req: Request, res: Response) => {
    try {
        const msgs = await getMessagesByConvo(req.params.id);
        res.status(200).send(msgs);
    } catch (e) {
        res.status(500).send(e.toString());
    }
});

/* create a new message in specific conversation */
router.post(`/conversation/:id/message`, async (req: Request, res: Response) => {
    try {
        const { text } = req.body;
        const timestamp: Date = new Date();
        await createMessage(req.params.id, {text, timestamp});
        res.status(200).send({'message': `Successfully created new message`});
    } catch (e) {
        res.status(500).send(e.toString());
    }
});

/********* THOUGHTS ************/

/* View all thoughts per specific message */
router.get(`/message/:id/thoughts`, async (req: Request, res: Response) => {
    try {
        const thoughts = await getThoughtsByMessage(req.params.id);
        res.status(200).send(thoughts);
    } catch (e) {
        res.status(500).send(e.toString());
    }
});

// /* create a new thought for specific message */
router.post(`/message/:id/thought`, async (req: Request, res: Response) => {
    try {
        const { text } = req.body;
        const timestamp: Date = new Date();
        await createThought(req.params.id, {text, timestamp});
        res.status(200).send({'message': `Successfully created new thought`});
    } catch (e) {
        res.status(500).send(e.toString());
    }
});

export default router;