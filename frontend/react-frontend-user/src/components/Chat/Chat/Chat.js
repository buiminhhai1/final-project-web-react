import React, { useState, useEffect } from 'react';
import io from 'socket.io-client';
import './Chat.css';
import { connect } from 'react-redux';

import { getAuthToken, getAuthUser } from '../../../store/reducers/auth';
import { ChatItem } from 'react-chat-elements';
import {
  ThemeProvider,
  TextComposer,
  Row,
  SendButton,
  TextInput,
  Message,
  MessageText,
  MessageList,
  MessageGroup
} from '@livechat/ui-kit';
let socket;

const themes = {
  vars: {
    'primary-color': '#427fe1',
    'secondary-color': '#fbfbfb',
    'tertiary-color': '#fff',
    'avatar-border-color': 'blue'
  },
  AgentBar: {
    Avatar: {
      size: '42px'
    },
    css: {
      backgroundColor: 'var(--secondary-color)',
      borderColor: 'var(--avatar-border-color)'
    }
  },
  Message: {
    css: {
      // fontWeight: 'bold',
      fontSize: '20px'
    },
    isOwn: {
      backgroundColor: 'var(avatar-border-color)',
      fontWeight: 'bold'
    }
  }
};

const Chat = props => {
  // const [groupName, setGroupName] = useState('');
  const [toUser, setToUser] = useState({});
  const [user, setUser] = useState({});
  const [currentGroup, setCurrentGroup] = useState({});
  const [groupList, setGroupList] = useState([]);
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const ENDPOINT = 'http://localhost:4000/';

  useEffect(() => {
    socket = io(ENDPOINT);
    setUser(props.user);
    socket.emit('join', { idUser: props.user.userId }, error => {
      if (error) {
        alert(error);
      }
    });
  }, [props]);

  useEffect(() => {
    socket.on('message', ({ user, group, message, time }) => {
      if (currentGroup._id === group) {
        currentGroup.lastMessage.message.message = message;
        setMessages([...messages, { idUser: user, message, time }]);
      }

    });

    socket.on('groupData', groupList => {
      if (groupList && groupList.length > 0) {
        const data = groupList[0];
        socket.emit('joinToGroup', { idGroup: data.group._id });
        setCurrentGroup(data.group);
        // setGroupName(data.user.name);
        setToUser(data.user);
      }
      setGroupList(groupList);
    });

    socket.on('messagesData', messagesData => {
      setMessages(messagesData);
    });

    return () => {
      socket.emit('disconnect');
      socket.off();
    }
  }, [messages, currentGroup])

  const sendMessage = message => {
    if (currentGroup._id) {
      setMessages([...messages, { idUser: user.userId, time: Date.now(), message: message }]);
      socket.emit(
        'sendMessage',
        { toIdUser: toUser._id, idGroup: currentGroup._id, message },
        () => setMessage('')
      );
      currentGroup.lastMessage.message.message = message;
    }
  };

  function dateFormat(getDate) {
    const date = new Date(getDate);
    let month = date.getMonth() + 1;
    let day = date.getDate();
    let hour = date.getHours();
    let minute = date.getMinutes();
    if (month.toString().length === 1) {
      month = '0' + month;
    }
    if (day.toString().length === 1) {
      day = '0' + day;
    }
    if (hour.toString().length === 1) {
      hour = '0' + hour;
    }
    if (minute.toString().length === 1) {
      minute = '0' + minute;
    }
    const dateTime = month + '/' + day + ' ' + hour + ':' + minute;
    return dateTime;
  }


  return (
    <div className="outerContainer">
      <div className="mchat-list-group">
        {groupList.map((data, i) => (
          <ChatItem
            key={i}
            avatar={data.user.imageUrl}
            title={data.user.name}
            subtitle={data.group.lastMessage.message.message}
            onClick={i => {
              socket.emit('joinToGroup', { idGroup: data.group._id });
              setCurrentGroup(data.group);
              // setGroupName(data.user.name);
              setToUser(data.user);
            }}
          />
        ))}
      </div>
      <div className="mchat-container">
        <ThemeProvider theme={themes}>
          <div style={{ height: 450, padding: 0, margin: 0 }}>
            <MessageList>
              {messages.map((message, i) => (
                <MessageGroup
                  key={i}
                  avatar={message.idUser === user.userId ? '' : toUser.imageUrl}
                >
                  <Message

                    date={dateFormat(message.time)}
                    authorName={
                      message.idUser === user.userId ? '' : toUser.name
                    }
                    isOwn={message.idUser === user.userId}
                  >
                    <MessageText>{message.message}</MessageText>
                  </Message>
                </MessageGroup>
              ))}
            </MessageList>
          </div>
          <TextComposer onSend={(value) => {
            sendMessage(value);
            value = message;
          }}>
            <Row align="center">
              <TextInput />
              <SendButton fit />
            </Row>
          </TextComposer>
        </ThemeProvider>
      </div>
    </div>
  );
};
const mapStateToProps = state => ({
  token: getAuthToken(state),
  user: getAuthUser(state)
});

export default connect(mapStateToProps)(Chat);
