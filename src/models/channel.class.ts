export class Channel {

    users: [] = [];
    messages: string[] = [];
    channelId: string = '';
    channelName: string = ``;


    constructor(obj?: any) {
        this.users = obj ? obj.users : [];
        this.messages = obj ? obj.messages : [];
        this.channelId = obj ? obj.channelId : '';
        this.channelName = obj ? obj.channelName : '';
    }


    public toJson() {
        return {
            users: this.users,
            messages: this.messages,
            channelId: this.channelId,
            channelName: this.channelName
        }
    }
}