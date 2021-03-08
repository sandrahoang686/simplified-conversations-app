const APIURL = "http://localhost:8000";

export const getConversations = async () => {
    try {
        const res = await fetch(`${APIURL}/conversations`);
        return res.json();
    } catch (e) {
        console.log(JSON.parse(e.message));
        return {}
    }
};

export const createConversation = async (title: string) => {
  try {
    const response = await fetch(`${APIURL}/conversation`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ title })
      });
      return response.json();
  } catch (e) {
        console.log(JSON.parse(e.message));
        return {};
    }
};

export const getMessages = async (convoId: string) => {
    try {
        const res = await fetch(`${APIURL}/conversation/${convoId}/messages`);
        return res.json();
    } catch (e) {
        console.log(`Error: ${JSON.parse(e.message)}`);
        return {}
    }
};

export const createMessage = async (id: string, text: string) => {
    try {
      const response = await fetch(`${APIURL}/conversation/${id}/message`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ text })
        });
        return response.json();
    } catch (e) {
          console.log(JSON.parse(e.message));
          return {};
      }
};

export const createThought = async (id: string, text: string) => {
    try {
      const response = await fetch(`${APIURL}/message/${id}/thought`, {
          method: 'POST',
          headers: {
              'Content-Type': 'application/json'
          },
          body: JSON.stringify({ text })
        });
        return response.json();
    } catch (e) {
          console.log(JSON.parse(e.message));
          return {};
      }
};

export const getThoughts = async (messageId: string) => {
    try {
        const res = await fetch(`${APIURL}/message/${messageId}/thoughts`);
        return res.json();
    } catch (e) {
        console.log(`Error: ${JSON.parse(e.message)}`);
        return {}
    }
};
