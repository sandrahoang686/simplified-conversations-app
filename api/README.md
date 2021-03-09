# Simplified-Conversations API

## How to run locally:
1. Please make sure you have Redis installed and running with cmd `redis-server`. Here is a quickstart guide [link](https://redis.io/topics/quickstart)

2. *OPTIONAL STEP* - you can view your Redis data by using `redis-commander`. Here is a quickstart guide [link](https://www.npmjs.com/package/redis-commander). This will likely run on `PORT 6379`

> For steps 3 & 4... run commands at root of the `API` directory
3. Run `npm install`

4. Run `npm start` ! This will start the api on `PORT 8000`

Nice! Now the API is good to go :3

## How to test locally:
Run `npm test` at root of `API` directory.

## TODOs:
* Search capabilities (text string distances?)
* Route tests
* Figure out importing in jest files
* Flush out typing