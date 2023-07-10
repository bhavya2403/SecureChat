import React from 'react';

const ChannelPage = () => {
  const channels = [
    { id: 1, name: 'Channel 1' },
    { id: 2, name: 'Channel 2' },
    { id: 3, name: 'Channel 3' },
    { id: 4, name: 'Channel 4' }
  ];

  const [activeChannel, setActiveChannel] = React.useState(channels[0]);

  return (
    <div className="container">
      <div className="sidebar">
        <div className="title-bar">
        <button className="logout-button">Logout</button>
          <h3> Username </h3>
          
        </div>
        <div className="channel-list">
          <ul>
            {channels.map(channel => (
              <li
                key={channel.id}
                className={channel === activeChannel ? 'channel active' : 'channel'}
                onClick={() => setActiveChannel(channel)}
              >
                {channel.name}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="content">
        <h1>{activeChannel.name}</h1>
        {/* Your channel-specific content here */}
      </div>
    </div>
  );
};

export default ChannelPage;
