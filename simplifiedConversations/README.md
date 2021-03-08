# Simplified-Conversations

## How to run locally:
> Note: Make sure the API is already running! Follow the instructions in the `README.md` in the `API` directory
1. Run `npm install`

2. Run `npm start` ! This will start the app on `PORT 3000`

Nice! Now the react app is good to go :3

## How to first use:
This is a very stripped down and raw version with no CSS. The data looks like whatever is stored in Redis.

1. At first you will see just 1 input box to `Enter New Conversation`. Go ahead and enter a conversation name and click `Submit`

2. This newly created conversation should now appear. Go ahead and click on this conversation as it is a `button`. Once you click it, you will see that you can `Type a new message` for this conversation. Go ahead and type a new message and click `Submit`

3. Once done submitting the new message, this will refresh the app. Go ahead and click on this same `conversation` and you will see the new message you created!

4. Okay, now that you can see your newly created `message`, you can click on the `message` as it is a button and create a `thought` for it! Go ahead and type in a `thought` and click `Submit`

5. Once you've created a new thought, the app will refresh because of the submit event. To find the thought, navigate to the `conversation` -> `message` that the thought was created under and you should see it :3

## How to test locally:
Run `npm test` at root of the directory.

## TODOs:
* Search capabilities (text string distances?)
* Components simulation tests (like click or onchange events)
* Api tests
* Flush out typing ...