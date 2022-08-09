export class Answer {

    creatorId: string = '';
    message: string = '';
    pictureUrl: string = '';
    timestamp: number = null;


    constructor(obj?: any) {
        this.creatorId = obj ? obj.creatorId : '';
        this.message = obj ? obj.message : '';
        this.pictureUrl = obj ? obj.pictureUrl : '';
        this.timestamp = obj ? obj.timestamp : null;
    }


    public toJson() {
        return {
            creatorId: this.creatorId,
            message: this.message,
            pictureUrl: this.pictureUrl,
            timestamp: this.timestamp,
        }
    }
}