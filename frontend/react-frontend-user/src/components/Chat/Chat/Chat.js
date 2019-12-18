import React, { useState, useEffect } from "react";
import io from "socket.io-client";

import Input from '../Input/Input';

import './Chat.css';
import { connect } from 'react-redux';

import { getAuthToken, getAuthUser } from "../../../store/reducers/auth";
import { ChatItem } from 'react-chat-elements'
import { ThemeProvider, TextComposer, Row, SendButton, TextInput, Message, MessageText, TitleBar, IconButton, CloseIcon, MessageList, MessageGroup } from '@livechat/ui-kit'
let socket;

const themes = {
  vars: {
    'primary-color': '#427fe1',
    'secondary-color': '#fbfbfb',
    'tertiary-color': '#fff',
    'avatar-border-color': 'blue',
  },
  AgentBar: {
    Avatar: {
      size: '42px',
    },
    css: {
      backgroundColor: 'var(--secondary-color)',
      borderColor: 'var(--avatar-border-color)',
    }
  },
  Message: {
    css: {
      // fontWeight: 'bold',
      fontSize: '20px',
    },
    isOwn: {
      backgroundColor: 'var(avatar-border-color)',
      fontWeight: 'bold'
    }
  },
}

const Chat = (props) => {
  const [groupName, setGroupName] = useState('');
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
    socket.emit('join', { idUser: props.user.userId }, (error) => {
      if (error) {
        alert(error);
      }
    });
  }, [ENDPOINT, window.location.search]);

  useEffect(() => {
    socket.on('message', ({ user, group, message }) => {
      if (currentGroup) {
        currentGroup.lastMessage.message.message = message;
      }
      if (currentGroup._id == group)
        setMessages([...messages, { idUser: user, message }]);
    });

    socket.on('groupData', (groupList) => {

      if (groupList && groupList.length > 0) {
        const data = groupList[0];
        socket.emit('joinToGroup', { idGroup: data.group._id });
        setCurrentGroup(data.group);
        setGroupName(data.user.name);
        // let toUser = data.group.groupInfo.idUser1;
        // if (toUser == props.user.userId) toUser = data.group.groupInfo.idUser2;
        setToUser(data.user);
      }
      setGroupList(groupList);
    })

    socket.on('messagesData', (messagesData) => {
      setMessages(messagesData);
    })

    return () => {
      socket.emit('disconnect');

      socket.off();
    }
  }, [messages])

  const sendMessage = (message) => {
    if (message) {
      setMessages([...messages, { idUser: user.userId, message: message }]);
      socket.emit('sendMessage', { toIdUser: toUser._id, idGroup: currentGroup._id, message }, () => setMessage(''));
    }
    if (currentGroup) {
      currentGroup.lastMessage.message.message = message;
    }
  }

  return (
    <div className="outerContainer">
      <div className="list-group">
        {
          groupList.map((data, i) => (
            <ChatItem
              key={i}
              avatar={data.user.imageUrl}
              title={data.user.name}
              subtitle={data.group.lastMessage.message.message}
              onClick={(i) => {
                socket.emit('joinToGroup', { idGroup: data.group._id });
                setCurrentGroup(data.group);
                setGroupName(data.user.name);
                setToUser(data.user);
              }}
            />
          ))
        }
      </div>
      <div className="container">
        <ThemeProvider theme={themes}>
          <TitleBar
            title={groupName}
            rightIcons={[
              <IconButton key="close">
                <CloseIcon />
              </IconButton>,
            ]}
          />
          <div style={{ height: 450, padding: 0, margin: 0 }}>
            <MessageList>
              {messages.map((message, i) =>
                <MessageGroup key={i} avatar={message.idUser == user.userId ? '' : toUser.imageUrl}>
                  <Message  authorName={message.idUser == user.userId ? user.name : toUser.name} 
                  date={message.time} isOwn={message.idUser == user.userId}>
                    <MessageText>{message.message}</MessageText>
                  </Message>
                </MessageGroup>

              )}
            </MessageList>
          </div>
          <TextComposer onSend={(value) => {
            sendMessage(value);
            value = '';
          }}>
            <Row align="center">
              <TextInput fill />
              <SendButton fit />
            </Row>

          </TextComposer>

        </ThemeProvider>

      </div>

    </div>
  );
}
const mapStateToProps = state => ({
  token: getAuthToken(state),
  user: getAuthUser(state),
})

export default connect(
  mapStateToProps
)(Chat);
