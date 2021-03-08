const redis = require("redis-mock");
jest.mock('redis', () => redis);

// TODO: Figure out how to port these over to Import statements...
const conversation = require('../src/conversations');
const message = require('../src/messages');
const thought = require('../src/thoughts');
const helpers = require('../src/helpers');

describe('Conversations', () => {
    it('createConversation', async () => {
        const data = {
            startDate: new Date(),
            title: 'Unicorns',
        };
        await conversation.createConversation(data);
        const redisData = await helpers.getValue("Conversations");
        const included = JSON.stringify(redisData).includes('Unicorns');
        expect(included).toEqual(true);
    });
    it('getConversations', async () => {
        const resp = await conversation.getConversations();
        const included = JSON.stringify(resp).includes('Unicorns');
        expect(included).toEqual(true);
    });  
});

describe('Messages', () => {
    it('createMessage', async () => {
        const data = {
            timestamp: new Date(),
            text: 'RandomMessage',
        };
        await message.createMessage("convoId1", data);
        const redisData = await helpers.getValue("Messages");
        const included = JSON.stringify(redisData).includes('RandomMessage');
        expect(included).toEqual(true);
    });
    it('getMessagesByConvo', async () => {
        const resp = await message.getMessagesByConvo("convoId1");
        const included = JSON.stringify(resp).includes('RandomMessage');
        expect(included).toEqual(true);
    });  
});

describe('Thoughts', () => {
    it('createThought', async () => {
        const data = {
            timestamp: new Date(),
            text: 'RandomThought',
        };
        await thought.createThought("messageId1", data);
        const redisData = await helpers.getValue("Thoughts");
        const included = JSON.stringify(redisData).includes('RandomThought');
        expect(included).toEqual(true);
    });
    it('getThoughtsByMessage', async () => {
        const resp = await thought.getThoughtsByMessage("messageId1");
        const included = JSON.stringify(resp).includes('RandomThought');
        expect(included).toEqual(true);
    });  
});