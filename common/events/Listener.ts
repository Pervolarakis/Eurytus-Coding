import {Subjects} from './Subjects';
import {Stan, Message} from 'node-nats-streaming';

interface Event {
    subject: Subjects,
    data: any
}

export abstract class Listener<T extends Event>{
    private client: Stan;
    abstract subject: T["subject"];
    abstract QueueGroup: string;
    abstract onMessage(data: T["data"], msg:Message):void;
    protected ackWait = 5*1000;

    constructor(client: Stan){
        this.client=client;
    }
    
    subscriptionOptions(){
        return this.client.subscriptionOptions()
            .setDeliverAllAvailable()
            .setManualAckMode(true)
            .setAckWait(this.ackWait)
            .setDurableName(this.QueueGroup)
    }
    
    listen(){
        let subscription = this.client.subscribe(this.subject, this.QueueGroup, this.subscriptionOptions());
        subscription.on('message',(msg: Message)=>{
            const data = msg.getData();
            if(typeof data === 'string'){
                this.onMessage(JSON.parse(data), msg)
            }else{
                this.onMessage(JSON.parse(data.toString('utf-8')),msg)
            }
        })
    }

}