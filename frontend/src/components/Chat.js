import React, { useEffect, useState } from 'react';
import { fetchMessages, sendMessage } from "../functions";
import AddRules from "./AddRules";

const Chat = ({ selectedChannel, username, isAdmin }) => {
    const [chats, setChats] = useState([]);
    const [message, setMessage] = useState('');
    const [pageStatus, setPageStatus] = useState("loading");

    useEffect(() => {
        setPageStatus("loading");
        fetchMessages(selectedChannel)
            .then(response => {
                setChats(response);
                setPageStatus("noloading");
            })
            .catch(error => {
                setPageStatus("noloading");
            });
    }, [selectedChannel]);

    const handleSendMessage = async () => {
        try {
            if (message.trim() === "") return; // Ignore empty messages
            const data = await sendMessage(selectedChannel, username, message);
            setMessage('');
            setChats(prevChats => [...prevChats, data]);

            // Scroll to the bottom of the chat container after sending a message
        } catch (error) {
        }
    };

    return (
        <div className="col-span-4 flex flex-col h-screen">
            <div className="">
                {isAdmin && (
                    <AddRules selectedChannel={selectedChannel} />
                )}
            </div>
            {pageStatus === "loading" ? (
                <div className="flex items-center justify-center h-full text-2xl">
                    Loading chats, please wait...
                </div>
            ) : (
                <div className="flex-1 overflow-y-auto">
                    {chats.length > 0 ? (
                        <div>
                            {chats.map((chat) => (
                                <div
                                    key={chat.pk}
                                    className={`mt-5 m-5 flex ${
                                        chat.fields.username === username ? 'justify-end' : 'justify-start'
                                    }`}
                                >
                                    <div className="bg-slate-400 rounded p-1">
                                        {chat.fields.username !== username && (
                                            <div className="font-bold">{chat.fields.username}</div>
                                        )}
                                        <div>{chat.fields.created_time}</div>
                                        <div>{chat.fields.message}</div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    ) : (
                        <div className="flex items-center h-full justify-center text-2xl">
                            No chats available for this channel.
                        </div>
                    )}
                </div>
            )}
            <div className="mt-auto p-3 flex rounded">
                <textarea
                    className="flex-grow border bg-gray-500 p-2 rounded-lg mr-3 placeholder:text-slate-300 m-10"
                    placeholder="Enter your message"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                ></textarea>
                <button
                    className="bg-blue-500 text-white px-4 py-2 rounded-lg my-10 mx-5"
                    onClick={handleSendMessage}
                >
                    Send
                </button>
            </div>
        </div>
    );
};

export default Chat;
