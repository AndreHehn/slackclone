export class User {

    userId: string = '';
    userName: string = '';
    profilePic: string = '';


    constructor(obj?: any) {
        this.userId = obj ? obj.userId : '';
        this.userName = obj ? obj.userName : '';
        this.profilePic = obj ? obj.profilePic : '';
    }


    public toJson() {
        return {
            userId: this.userId,
            userName: this.userName,
            profilePic: this.profilePic,

        }
    }
}