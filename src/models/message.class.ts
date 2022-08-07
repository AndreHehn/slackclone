export class Message {

    messageId: string = '';
    creatorId: string = '';
    message: string = '';
    pictureUrl: string = '';
    timestamp: number = null;
    answers: [] = [];


    constructor(obj?: any) {
        this.messageId = obj ? obj.messageId : '';
        this.creatorId = obj ? obj.creatorId : '';
        this.message = obj ? obj.message : '';
        this.pictureUrl = obj ? obj.pictureUrl : '';
        this.timestamp = obj ? obj.timestamp : null;
        this.answers = obj ? obj.answers : [];
    }


    public toJson() {
        return {
            messageId: this.messageId,
            creatorId: this.creatorId,
            message: this.message,
            pictureUrl: this.pictureUrl,
            timestamp: this.timestamp,
            answers: this.answers,
        }
    }
}