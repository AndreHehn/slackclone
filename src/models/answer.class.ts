export class Answer {

    answerId: string = '';
    creatorId: string = '';
    message: string = '';
    pictureUrl: string = '';
    timestamp: number = null;


    constructor(obj?: any) {
        this.answerId = obj ? obj.answerId : '';
        this.creatorId = obj ? obj.creatorId : '';
        this.message = obj ? obj.message : '';
        this.pictureUrl = obj ? obj.pictureUrl : '';
        this.timestamp = obj ? obj.timestamp : null;
    }


    public toJson() {
        return {
            answerId: this.answerId,
            creatorId: this.creatorId,
            message: this.message,
            pictureUrl: this.pictureUrl,
            timestamp: this.timestamp,
        }
    }
}