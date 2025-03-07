import axios from "axios";
import { BACKEND_URL } from "../config";
import { ChatRoomClient } from "./chatroomClient";

async function getMessages(RoomId: number) {
    const response = await axios.get(`${BACKEND_URL}/chat/${RoomId}`)
    return response.data.chats;
}
export async function ChatRoomComponent({ id }: {
    id: number
}) {
    const RoomId = id;
    const chats = await getMessages(RoomId);

    return <div>
        <div>
            <ChatRoomClient chats={chats.map(({ message, id }: { message: string, id: number }) => ({ message, id }))} id={RoomId} />
        </div>
        
    </div>

}