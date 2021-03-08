import React from "react";
import Adapter from 'enzyme-adapter-react-16';
import {shallow, configure} from 'enzyme';

import { Conversation, Message, Thought} from "../components/Conversation";

configure({ adapter: new Adapter() });

describe("<Conversation />", () => {
  it("should render a Conversation component", async () => {
    const component = shallow(<Conversation />);
    expect(component.html()).toEqual('<div><h1>Conversations</h1><form><label>New Conversation Name:<input type="text" name="conversationName" placeholder="Enter New Conversation Name Here" value=""/></label><input type="submit" value="Submit"/></form><div></div></div>');
  });
});

describe("<Message />", () => {
  it("should render a Message component with no messages", async () => {
    const component = shallow(<Message convoId="testConvo1" title="" messageId="" displayThoughts={false}/>);
    expect(component.html()).toEqual('<div><h1>Messages for </h1><form><input type="text" name="messageText" placeholder="Type new message here" value=""/><input type="submit" value="Submit"/></form><div><h2>No messages created</h2></div></div>');
  });
});

describe("<Thought />", () => {
  it("should render a Thought component with no thoughts", async () => {
    const component = shallow(<Thought messageId="testMessage1"/>);
    expect(component.html()).toEqual('<div><h1>Thoughts for Message ID testMessage1</h1><form><input type="text" name="thoughtText" placeholder="Type new thought here" value=""/><input type="submit" value="Submit"/></form><div><h2>No Thoughts created</h2></div></div>');
  });
});