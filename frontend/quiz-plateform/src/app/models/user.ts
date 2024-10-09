export class User {
   
    constructor(
        public id: number ,
        public username: string,
        public password: string,
        public email: string,
        public phone: number ,
        public cv?: string,
        public role?: { id: number, rolename: string },
        public locked: boolean=false,
        public enabled: boolean= true
        
    ) {
    }
}