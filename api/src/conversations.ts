import { Conversations, Set } from './types';
import * as helpers from './helpers';

export const createConversation = async (data: Conversations): Promise<string> => await helpers.setValue(Set.conversations, data);
export const getConversations = async () => await helpers.getValue(Set.conversations);