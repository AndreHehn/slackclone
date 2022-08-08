export class Channel {

    users: [] = [];
    messages: string[] = [];
    channelId: string = '';


    constructor(obj?: any) {
        this.users = obj ? obj.users : [];
        this.messages = obj ? obj.messages : [];
        this.channelId = obj ? obj.channelId : '';
    }


    public toJson() {
        return {
            users: this.users,
            messages: this.messages,
            channelId: this.channelId,
        }
    }
}