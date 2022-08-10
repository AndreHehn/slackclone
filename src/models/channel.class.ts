export class Channel {

    users: string[] = [];
    messages: string[] = [];
    channelId: string = '';
    channelName: string = '';
    description: string = '';
    type: string = '';


    constructor(obj?: any) {
        this.users = obj ? obj.users : [];
        this.messages = obj ? obj.messages : [];
        this.channelId = obj ? obj.channelId : '';
        this.channelName = obj ? obj.channelName : '';
        this.type = obj ? obj.type : '';
        this.description = obj ? obj.description : '';
    }


    public toJson() {
        return {
            users: this.users,
            messages: this.messages,
            channelId: this.channelId,
            channelName: this.channelName,
            type: this.type,
            description: this.description
        }
    }
}