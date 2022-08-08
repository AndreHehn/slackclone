export class Channel {

    users: [] = [];
    messages: string[] = [];
    channelId: string = '';
    channelName: string = '';
    type: string = '';


    constructor(obj?: any) {
        this.users = obj ? obj.users : [];
        this.messages = obj ? obj.messages : [];
        this.channelId = obj ? obj.channelId : '';
        this.channelName = obj ? obj.channelName : '';
        this.type = obj ? obj.type : '';
    }


    public toJson() {
        return {
            users: this.users,
            messages: this.messages,
            channelId: this.channelId,
            channelName: this.channelName,
            type: this.type
        }
    }
}