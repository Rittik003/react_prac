import conf from "../conf/conf";
import { Client, Account,ID} from "appwrite";

export class AuthService{
    client=new client();
    account;
    constructor(){
        this.client
            .setEndpoint(appwriteUrl)
            .setProject(appwriteProjectId);

        this.Account=new Account(this.client);
    }


    async createAccount({email,password,name}){
        try{
            const userAccount=await this.account.create(ID.unique(),email,password,name);
            if(userAccount)
            {
                return this.login({email,password});
                //return this.login(email,password);
            }
            else{
                return userAccount;
            }
        }catch(error){
            throw error;
        }
    }

    async login({email,password})
    {
        try{
            return await this.account.createEmailSession(email,password);
        }catch(error){
            throw error;
        }
    }

    async getCurrentUser()
    {
        try{
            return await this.account.get()
        }catch(error){
            throw error;
        }
        return null;
    }

    async logout()
    {
        try{
            await this.account.deleteSessions();
        }catch(error)
        {
            throw error;
        }
    }
}

const authService=new AuthService()

export default authService;