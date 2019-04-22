export class User {
    email: string;
    name: string;
    uid: string;
    constructor(email: string,
                name: string,
                uid: string){
        this.email=email;
        this.name=name;
        this.uid=uid;
    }
}