import React, {useEffect, useState} from 'react';

const Channels = ({ username, selectedChannel, handleChannelClick }) => {
    const [channels, setChannels] = useState([{"pk": "loading.."}]);
    const [channelName, setChannelName] = useState("");

    const fetchChannels = async () => {
        try {
            const response = await fetch("/messaging/get_channels");
            const data = await response.json();
            setChannels(data);
        } catch (error) {
        }
    };
    useEffect(() => {
        fetchChannels();
    }, []);

    const handleCreateChannel = async (event) => {
        event.preventDefault();
        const requestOptions = {
            method: "POST",
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({
                username: username,
                channel_name: channelName,
            })
        }
        await fetch("/messaging/create_channel",requestOptions);
        await fetchChannels();
    }
    return (
        <div className="col-span-1 bg-slate-800 h-screen">
            <div className="font-medium text-slate-300 mt-4">Channels</div>
            <ul>
                {channels.map((channel) => (
                    <li
                        key={channel.pk}
                        className={`mt-2 mb-2 text-2xl rounded-2xl text-center ${selectedChannel === channel.pk ? 'bg-slate-400' : 'hover:bg-slate-500 cursor-pointer'}`}
                        onClick={() => handleChannelClick(channel.pk)}
                    >
                        {channel.pk}
                    </li>
                ))}
            </ul>
            <div className="font-medium text-slate-300 mt-4">Create channel</div>
            <input
                type="text"
                value={channelName}
                onChange={e => setChannelName(e.target.value)}
                className="bg-gray-500 block rounded-2xl border-2 border-slate-400
                        focus:border-white ml-1 mr-1 mt-2 w-11/12"
            />
            <div className="flex items-center justify-center w-full">
            <button onClick={handleCreateChannel} className="w-4/5 mt-7 bg-blue-500 text-white px-4 py-2 rounded-3xl hover:bg-blue-400">
                Create
            </button>
            </div>
        </div>
    );
};

export default Channels;
