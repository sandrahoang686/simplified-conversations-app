import { Thoughts, Set } from './types';
import * as helpers from './helpers';

export const createThought = async (messageId: string, data: Thoughts) => {
    const { text, timestamp } = data;
    return await helpers.setValue(Set.thoughts, {messageId, text, timestamp});
};

// Creating my own filtering mechanism
export const getThoughtsByMessage = async (messageId: string) => {
    const thoughts = await getThoughts();

    var filtered = Object.keys(thoughts).reduce((r, e) => {
        //@ts-ignore
        if (messageId == thoughts[e].messageId) {r[e] = thoughts[e]}
        return r;
      }, {});
      
      return filtered
};

const getThoughts = async () => await helpers.getValue(Set.thoughts);