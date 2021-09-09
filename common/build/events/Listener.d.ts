import { Subjects } from './Subjects';
import { Stan, Message } from 'node-nats-streaming';
interface Event {
    subject: Subjects;
    data: any;
}
export declare abstract class Listener<T extends Event> {
    private client;
    abstract subject: T["subject"];
    abstract QueueGroup: string;
    abstract onMessage(data: T["data"], msg: Message): void;
    protected ackWait: number;
    constructor(client: Stan);
    subscriptionOptions(): import("node-nats-streaming").SubscriptionOptions;
    listen(): void;
}
export {};
