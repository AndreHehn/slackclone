export class User {

    displayName: string = '';
    uid: string;
    email: string;
    photoURL: string;



    constructor(obj?: any) {
        this.displayName = obj ? obj.userName : '';
        this.uid = obj ? obj.uid : '';
        this.email = obj ? obj.email : '';
        this.photoURL = obj ? obj.photoURL : './assets/avatar.png';
    }


    public toJson() {
        return {
            displayName: this.displayName,
            uid: this.uid,
            email: this.email,
            photoURL: this.photoURL
        }
    }
}