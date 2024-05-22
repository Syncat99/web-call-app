export interface WaitingUser {
    userId:string;
    language:string;
    peerId:string;
} 

export class Waiting {
    list:WaitingUser[]= [];

    addUser(user:WaitingUser){
        const found = this.list.find(({language})=>language === user.language);
        if(!!found){
            this.list = this.list.filter((el)=>el.userId === found.userId);
            return found;
        }

        this.list.push({...user,language:user.language.toLocaleLowerCase()})
        return null;
    }

    getUser(userId:string){
        return this.list.find(({userId:id})=>id===userId);
    }
}

let waiting: Waiting | null = null;
export const getWaiting = ()=> {
    if(!waiting) waiting = new Waiting();
    return waiting;
}