export interface Conversations {
    title: string,
    startDate: Date
}

export interface Messages {
    text: string,
    timestamp: Date, // Date and time sent
    conversationId?: string
}

export interface Thoughts {
    text: string,
    timestamp: Date, // Date and time sent
    messageId?: string
}

export enum Set {
    conversations = "Conversations",
    messages = "Messages",
    thoughts = "Thoughts"
}