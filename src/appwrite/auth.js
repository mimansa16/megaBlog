
//SEE THIS CODE IN THE OFFICIAL DOCS OF APPWRITE--AUTH AS REFERENCE, WE'RE DOING EXACTLY THAT BUT JUST IN AN OPTIMIZED WAY

//THIS IS FUTURE PROOF APPWRITE AUTHENTICATION CODE --> ISKO KAHI BHI USE KAR SAKTE HAIN AB IN ANY OTHER PROJECT AISE KE AISE!!!
import conf from "../conf/conf";
import { Client, Account, ID } from "appwrite";

//now here we're directly exporting a class, so anyone who is accessing this class would have to make 
//an obj to do so. So we'll beforehand make an obj(authService) and export it which could access all methods inside this class.
export class Authservice{
 client = new Client();
 account;

 constructor(){ //every time a new obj is created this constructor is called, a client is defined and a new account object is created !
   this.client
              .setEndpoint(conf.appwriteUrl)
              .setProject(conf.appwriteProjectId);
              this.account = new Account(this.client);
              //now acc to docs we can create an account through account.create and passing the req parameters here only but if ever 
              //we want to remove appwrite in our application and use some other backend service then we would have to manually do changes 
              //inside every account obj to change the endpoint and proj details, thus to solve this prob, instead of creating an acc here
              //we could wrap it up in a different method(createAccount(neeche)).
 }
     //now if at any time we decide to change our backend as a service from appwrite to any other, we could directly just do changes in 
     //the constructor only and change the endpoint and proj details while not disturbing the account creation method.
     //coz yaha pe ab backend kuch bhi ho to create acc you directly just have to call the below method from AuthService class.
   async createAccount({email,password,name}){ 
    try{
        const userAccount = await this.account.create(ID.unique(), email, password, name);
        if(userAccount){
          //call login -- if account is successfully created then directly login
          return this.login({email, password});
        }
        else{
            return userAccount;
        }
    }catch(error){
       throw error;
    }
   }
   //Similarly we'll make other methods like login.

   async login({email, password}){ // login karna mtlb sessions banana.
    try{
         return await this.account.createEmailSession(email, password);
    }catch(error){
        throw error;
    }
   }

   async getCurrentUser(){ // to get the currently logged in user
      try{
          const currentUser = await this.account.get();
          if(currentUser){
            return currentUser;
          }else{
             return null;
          }
      }catch(error){
         throw error;
      }
   }

    async logout({}){
        try{
           await this.account.deleteSessions();
        }catch(error){
            throw error;
        }
    }

  

}; 

const authService = new Authservice(); //object

export default authService;

//the amazing part is ki ye saare methods can be easily accessed using this obj(authService) and the methods are made in such a way
//that their functionality and code would remail the same irrespective of the backend as a service used. under the hood kya ho rha hai
//ye kisi ko pata nhi chal rha other than the method itself!!!