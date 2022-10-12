import { User } from "firebase/auth";
import {
  addDoc,
  collection,
  orderBy,
  query,
  serverTimestamp,
  getDocs,
} from "firebase/firestore";
import { db } from "../firebase_app";
export default class MessageService {
  room = "ROOMS";
  message = "MESSAGES";
  messagesQuery = query(
    collection(db, this.message),
    orderBy("timestamp", "asc")
  );
  roomQuery = query(collection(db, this.room));
  roomsCollectionRef = collection(db, this.room);
  messagesCollectionRef = collection(db, this.message);
  async sendMessage(
    channelID: string,
    message: string,
    room: string,
    user: User | undefined | null
  ): Promise<{ success: boolean; message: string | null | undefined }> {
    var res = false;
    var msg: string | null | undefined;
    await addDoc(this.messagesCollectionRef, {
      channelID: channelID,
      room: room,
      message: message,
      user: user?.displayName,
      timestamp: serverTimestamp(),
      userImage: user?.photoURL,
    })
      .then((e) => {
        if (e.id) {
          res = true;
        }
        res = false;
        msg = "Sorry an error occurred while sending this message";
      })
      .catch((e) => {
        msg = e.message;
        res = false;
      });
    return { success: res, message: msg };
  }

  async checkIfChannelExists(channelName: string): Promise<boolean> {
    const res = await getDocs(this.roomsCollectionRef);
    const doc = res.docs.find(
      (item) =>
        (item.data()["name"] as string).toLowerCase() ===
        channelName.toLowerCase()
    );
    var notDefined: undefined;

    if (doc === notDefined) {
      return false;
    }
    return true;
  }
  async createChannel(
    channelName: string
  ): Promise<{ success: boolean; message?: string }> {
    var value = false;
    var msg: string | undefined;
    await addDoc(this.roomsCollectionRef, {
      name: channelName,
    })
      .then((result) => {
        value = true;
      })
      .catch((e) => {
        msg = e.message;
      });
    return { success: value, message: msg };
  }
}
