import React, { useEffect, useState } from 'react';
import Channels from '../components/Channels';
import Chat from '../components/Chat';
import {checkIfAdmin, checkIfMember} from "../functions";
import ChannelJoining from "../components/ChannelJoining";

const Home = () => {
    const [username, setUsername] = useState('');
    const [selectedChannel, setSelectedChannel] = useState(null);
    const [isMember, setIsMember] = useState(false);
    const [isAdmin, setIsAdmin] = useState(false);

    useEffect(() => {
        setUsername(window.username); // Set the username from the window object
    }, []);

    const handleJoinComplete = () => {
        setIsMember(true); // Update the membership status after joining completes
    };
    const handleChannelClick = async (channel) => {
        setSelectedChannel(channel);
        setIsMember(await checkIfMember(channel, username));
        setIsAdmin(await checkIfAdmin(channel, username));
    };

    return (
        <div className="grid grid-cols-5">
            <div className="col-start-1 col-end-6 bg-slate-500 h-10 text-2xl flex items-center justify-center">Welcome, {username}!</div>
            <Channels
                username={username}
                selectedChannel={selectedChannel}
                handleChannelClick={handleChannelClick}
            />
            {selectedChannel ? (
                isMember ? (
                    <Chat selectedChannel={selectedChannel} username={username} isAdmin={isAdmin} />
                ) : (
                    <ChannelJoining
                        selectedChannel={selectedChannel}
                        username={username}
                        onJoinComplete={handleJoinComplete}
                    />
                )
            ) : (
                <div className="text-2xl col-span-4 flex justify-center items-center">Please select a channel to continue</div>
            )}
        </div>
    );
};


export default Home;
