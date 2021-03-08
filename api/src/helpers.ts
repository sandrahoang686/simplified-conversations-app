import * as redis from 'redis';
import { promisify } from 'util';
import { generate } from 'shortid';
import { Conversations, Messages, Set, Thoughts } from './types';

const client = redis.createClient();
const hgetall = promisify(client.hgetall).bind(client);

/* create a hash set in Redis*/
export const setValue = ( async (set: Set, data: Conversations | Messages | Thoughts): Promise<string> =>  {
    await client.hmset(set, generate(), JSON.stringify(data));
    return 'Done';
});

/* Get all values for a specific set in redis */
export const getValue = ( async (set: Set) => {
    const values = await hgetall(set);
    for (let v in values) {
        values[v] = JSON.parse(values[v]);
    }
    return values == null ? {} : values;
});