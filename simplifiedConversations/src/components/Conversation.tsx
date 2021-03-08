import { FC, useEffect, useState } from 'react';
import { createConversation, createMessage, createThought, getConversations, getMessages, getThoughts } from '../api';

type MessageProps = {
    convoId: string,
    messageId: string,
    title: string
    displayThoughts: boolean // used in both
 }

 type ThoughtProps = {
    messageId: string
 }

export const Conversation: FC<{}> = () => {

    const [conversations, setConversations] = useState("");
    const [convoId, setConvoId] = useState("");
    const [title, setTitle] = useState("");
    const [display, setDisplay] = useState(false);
    const [name, setName] = useState("");

    useEffect(() => {
        grabConversations()
    }, []);

    const grabConversations = async () => {
        const data = await getConversations();
        data == {} ? setConversations("No Conversations Created") : setConversations(data);
        return;
    };

    const displayMessages = (id: string, title: string) => {
        setConvoId(id);
        setTitle(title);
        setDisplay(true);
    }

    const handleChange = (e: any) => setName(e.target.value);
    
    const createNewConversation = async (e: any) => {
        return await createConversation(name);
    };

    const displayConversations = () => {
        return (
          <div>
            {Object.entries(conversations).map(([key, value]) => {
                //@ts-ignore
                return (<button onClick={() => {displayMessages(key, value.title)}}><h2 key={key}>ID: {key}: TITLE: {JSON.stringify(value)}</h2></button>)
            })}
            {
                display ? 
                <Message convoId={convoId} title={title} messageId="" displayThoughts={false}/>
                :
                null
            }
          </div>
        )
    };

    const newConversationForm = () => {
        return (
            <form onSubmit={createNewConversation}>
                <label>
                    New Conversation Name:
                    <input type="text" name="conversationName" placeholder="Enter New Conversation Name Here" value={name} onChange={handleChange} />
                </label>
                <input type="submit" value="Submit" />
            </form>
        )
    };

    return (
        <div>
            <h1>Conversations</h1>
            {newConversationForm()}
            {displayConversations()}
        </div>
    )
};

export const Message: FC<MessageProps> = (props) => {

    const [messages, setMessages] = useState({});
    const [messageId, setMessageId] = useState("");
    const [display, setDisplay] = useState(false);
    const [text, setText] = useState("");

    useEffect(() => {
        grabMessages()
    }, [props.convoId]);

    const handleChange = (e: any) => {
        setText(e.target.value);
        return;
    };

    const createNewMessage = async (e: any) => {
        await createMessage(props.convoId, text);
        return;
    };

    const grabMessages = async () => {
        setMessageId(props.messageId); // reset
        setDisplay(props.displayThoughts);
        const data = await getMessages(props.convoId);
        data == {} ? setMessages({}) : setMessages(data);
        return;
    };

    const displayThoughts = (id: string) => {
        setMessageId(id);
        setDisplay(true);
    }

    const newMessageForm = () => {
        return (
            <form onSubmit={createNewMessage}>
                <input type="text" name="messageText" placeholder="Type new message here" value={text} onChange={handleChange} />
                <input type="submit" value="Submit" />
            </form>
        )
    };

    const displayMessages = () => {
        return (
          <div>
            {
                JSON.stringify(messages) == '{}' ?
                <h2>No messages created</h2>
                :
                <ul>
                {Object.entries(messages).map(([key, value]) => {
                    return (<button onClick={() => {displayThoughts(key)}}><li key={key}>ID: {key}: DATA: {JSON.stringify(value)}</li></button>)
                })}
                </ul>
            }
            {
                display ? 
                <Thought messageId={messageId}/>
                :
                null
            }
          </div>
        )
    };

    return (
        <div>
            <h1>Messages for {props.title}</h1>
            {newMessageForm()}
            {displayMessages()}
        </div>
    )
}

export const Thought: FC<ThoughtProps> = (props) => {

    const [text, setText] = useState("");
    const [thoughts, setThoughts] = useState({});

    useEffect(() => {
        grabThoughts()
    }, [props.messageId]);

    const handleChange = (e: any) => {
        setText(e.target.value);
        return;
    };

    const createNewThought = async (e: any) => {
        await createThought(props.messageId, text);
        return;
    };

    const grabThoughts = async () => {
        const data = await getThoughts(props.messageId);
        if (data !== {}) { setThoughts(data) }
        return;
    };

    const newMessageForm = () => {
        return (
            <form onSubmit={createNewThought}>
                <input type="text" name="thoughtText" placeholder="Type new thought here" value={text} onChange={handleChange} />
                <input type="submit" value="Submit" />
            </form>
        )
    };

    const displayThoughts = () => {
        return (
          <div>
            {
                JSON.stringify(thoughts) == '{}' ?
                <h2>No Thoughts created</h2>
                :
                <ul>
                {Object.entries(thoughts).map(([key, value]) => {
                    return (<li key={key}>ID: {key}: DATA: {JSON.stringify(value)}</li>)
                })}
                </ul>
            }
          </div>
        )
    };

    return (
        <div>
            <h1>Thoughts for Message ID {props.messageId}</h1>
            {
                props.messageId ? 
                newMessageForm()
                : 
                null
            }
            {displayThoughts()}
        </div>
    )
}