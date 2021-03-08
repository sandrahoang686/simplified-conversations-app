import { Messages, Set } from './types';
import * as helpers from './helpers';

export const createMessage = async (conversationId: string, data: Messages) => {
    const {text, timestamp} = data;
    return await helpers.setValue(Set.messages, {conversationId, text, timestamp});
}

// Creating my own filtering mechanism
export const getMessagesByConvo = async (convoId: string): Promise<{}> => {
    const messages = await getMessages();

    var filtered = Object.keys(messages).reduce((r, e) => {
        //@ts-ignore
        if (convoId == messages[e].conversationId) {r[e] = messages[e]}
        return r;
      }, {});

      return filtered
};

const getMessages = async (): Promise<{}> => await helpers.getValue(Set.messages);