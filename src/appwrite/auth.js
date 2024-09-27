import configimport config from "./../config/config";
import { Client, Account, Id } from "./appwrite";

const appwriteUrl = config.appwriteUrl;
const appwriteProjectId = config.appwriteProjectId;
const appwriteDatabaseId = config.appwriteDatabaseId;
const appwriteCollectionId = config.appwriteCollectionId;
const appwriteBucketId = config.appwriteBucketId;

export class AuthService {
       client = new Client();
       account;

       constructor() {
              this.client
                     .setEndpoint(appwriteUrl)
                     .setProject(appwriteProjectId);
              this.account = new Account(this.client);
       }

       async createAccount ({email, password, name}) {
        try {
            cosnt userAccount = await this.account.create(
                Id.unique(),
                email,
                password,
                name
            );
            if (userAccount) {
                // call another method to login directly after creating profile
                return this.login({email, password});
            } else {
                return userAccount;
            }
        } catch (error) {
            throw errror;
        }
       }

       async login ({email, password}) {
        try {
            const user = await this.account.createEmailSession(email, password);
            return user;
        } catch (error) {
            throw error;
        }
       }

       async getCurrentUser() {
        try {
            const user = await this.account.get();
            return user;
        } catch (error) {
            throw error;
        }

        return null;
       }

       async logout() {
        try {
            const user = await this.account.deleteSessions();
            return user;
        } catch (error) {
            throw error;
        }
       }

    }

const authService = new AuthService();

export default authService;