import { Client } from '@stomp/stompjs';
import SockJS from 'sockjs-client';

let stompClient = null;

const connect = (callback) => {
  const socket = new SockJS('http://127.0.0.1:8000/ws/chat/');
  stompClient = new Client({
    webSocketFactory: () => socket,
    onConnect: (frame) => {
      console.log('Connected: ' + frame);
      if (callback) callback();
    },
    onStompError: (frame) => {
      console.error('Broker reported error: ' + frame.headers['message']);
      console.error('Additional details: ' + frame.body);
    },
  });

  stompClient.activate();
};

const subscribe = (roomName, onMessageReceived) => {
  if (stompClient && stompClient.active) {
    return stompClient.subscribe(`/ws/chat/${roomName}/`, (message) => {
      onMessageReceived(JSON.parse(message.body));
    });
  } else {
    console.error('STOMP client is not connected');
  }
};

const sendMessage = (roomName, message) => {
  if (stompClient && stompClient.active) {
    stompClient.publish({
      destination: `/ws/chat/${roomName}/`,
      body: JSON.stringify(message)
    });
  } else {
    console.error('STOMP client is not connected');
  }
};

const disconnect = () => {
  if (stompClient) {
    stompClient.deactivate();
  }
};

export { connect, disconnect, sendMessage, subscribe };
