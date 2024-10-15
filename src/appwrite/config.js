import conf from "../conf/conf";
import { Client, Databases, Storage, Query, ID } from "appwrite";


export class Service {
    client = new Client()
    databases
    buckets

    constructor() {
        this.client.setEndpoint(conf.appwriteUrl).setProject(conf.appwriteProjectId)
        this.databases = new Databases(this.client)
        this.buckets = new Storage(this.client)
    }

    async getPost(slug){
        try {
            return await this.databases.getDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug)
        } catch (error) {
            console.log("Appwrite service Error :: getPost() :: ", error);
            return false
            
        }
    }

    async getPosts(queries = [Query.equal("status", "active")]){
        try {
            return await this.databases.listDocuments(conf.appwriteDatabaseId, conf.appwriteCollectionId, queries)
        } catch (error) {
            console.log("Appwrite service Error :: getPosts() :: ", error);
            return false
        }
    }

    async createPost({title, slug, content, featuredImage, status, userId}){
        try {
            return await this.databases.createDocument(
                conf.appwriteDatabaseId, 
                conf.appwriteCollectionId,
                slug,
                {
                    title, content, featuredImage, status, userId
                }
            )
        } catch (error) {
            console.log("Appwrite service Error :: createPost() :: ", error);
            return false
        }
    }

    async updatePost(slug, {title, content, featuredImage, status}){
        try {
            return await this.databases.updateDocument(
                conf.appwriteDatabaseId,
                conf.appwriteCollectionId,
                slug,
                {
                    title, content, featuredImage, status
                }
            )
        } catch (error) {
            console.log("Appwrite service Error :: updatePost() :: ", error);
            return false
        }
    }

    async deletePost(slug) {
        try {
            await this.databases.deleteDocument(conf.appwriteDatabaseId, conf.appwriteCollectionId, slug)
            return true
        } catch (error) {
            console.log("Appwrite service Error :: deletePost() :: ", error);
            return false
        }
    }

    //Storage Service
    async uploadFile(file) {
        try {
            return this.buckets.createFile(conf.appwriteBucketId, ID.unique(), file)
        } catch (error) {
            console.log("Appwrite service Error :: uploadFile() :: ", error);
            return false
        }
    }

    async deleteFile(fileID) {
        try {
            return this.buckets.deleteFile(conf.appwriteBucketId, fileID)
        } catch (error) {
            console.log("Appwrite service Error :: deleteFile() :: ", error);
            return false
        }
    }

    getFilePreview(fileID) {
        try {
            return this.buckets.getFilePreview(conf.appwriteBucketId, fileID).href
        } catch (error) {
            console.log("Appwrite service Error :: getFilePreview() :: ", error);
            return false
        }
    }
}


const service = new Service();
export default service;