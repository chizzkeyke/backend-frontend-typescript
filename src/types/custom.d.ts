declare namespace Express {
   export interface Request {
      user: string
   }
}

interface AbstractChatRoom {
   createPrivateRoom(): PrivateRoom
   createPublicRoom(): PublicRoom
}

interface Message {
   body: string
   author: string
   date_created: Date
   required: boolean
}

class Room {
   private numberRoom: string
   private message: Message[]
   public senders: number

   constructor() {

   }

   async createRoomInDB() {

   }

   async createRoom() {

   }
}