export class Client {
    public civility: string;
    public firstName: string;
    public lastName: string;
    public email: string;
    public telphone: number;
    public street: string;
    public city: string;
    public zipCode: number;
    public login: string;
    public password: string;
    
    constructor(client: Client){
        this.civility = client.civility;
        this.firstName = client.firstName;
        this.lastName = client.lastName;
        this.email = client.email;
        this.telphone = client.telphone;
        this.street = client.street;
        this.city = client.city;
        this.zipCode = client.zipCode;
        this.login = client.login;
        this.password = client.password;
    }   
}