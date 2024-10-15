/* eslint-disable no-useless-catch */
import { Client, Account, ID } from "appwrite";
import conf from "../conf/conf";

export class AuthService {
    client = new Client();
    account;
    constructor () {
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId) 
        this.account = new Account(this.client)
    }

    async createAccount({email, password, name}){
        try {
            const userAccount = await this.account.create(ID.unique(), email, password, name)
            if (userAccount) {
                return this.login({email, password})
            } else {
                return userAccount;
            }
        } catch (error) {
            throw error;
        }
    };
    
    async logout(){
        try {
            return await this.account.deleteSessions()
        } catch (error) {
            console.log("Appwrite Error :: logout() :: ", error);
            
        }
    };

    async login({email, password}){
        try {
            return await this.account.createEmailPasswordSession(email, password)
        } catch (error) {
            return error;
        }
    };

    async getCurrentUser(){
        try {
            return await this.account.get()
        } catch (error) {
            console.log("Appwrite Error :: getCurrentUser() :: " , error);
            
        }
        return null;
    };
}

const authService = new AuthService();

export default authService;