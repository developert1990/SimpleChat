import React, { useState, useEffect } from 'react';
import { useHistory } from 'react-router-dom';
import queryString from 'query-string';
import io from 'socket.io-client';
import './Chat.css';
import InfoBar from '../InfoBar/InfoBar';
import Input from '../Input/Input';
import Messages from '../Messages/Messages';

let socket;

const Chat = ({ location }) => {

    const history = useHistory();

    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    const [icon, setIcon] = useState('');
    const [users, setUsers] = useState('');
    const [message, setMessage] = useState({
        msg: '',
        time: '',
        url: '',
        fileName: '',
        userIcon: '1.jpg',

    });
    const [messages, setMessages] = useState([]);
    const ENDPOINT = 'https://react-chat-application-hong.herokuapp.com/';

    useEffect(() => {
        const { name, room, icon } = queryString.parse(location.search); // 쿼리스트링 문자열을 객체로
        // console.log(queryString.parse(location.search));
        // console.log(socket = io(ENDPOINT))
        socket = io(ENDPOINT);

        setName(name);
        setRoom(room);
        setIcon(icon);

        // console.log(socket)
        // emit 이벤트를 발생시킨다 즉 요청을 한다. 서버측이던 클라이언트 측이던 상관없이 이벤트를 발생시키기위해선 emit을 사용한다.
        socket.emit('join', { name, room, icon }, (error) => {

            if (error) {
                alert(error);
                history.goBack('/');
            }
        });

        return () => {
            socket.emit('disconnect');

            socket.off();

        }
    }, [ENDPOINT, location.search, history]);



    useEffect(() => {
        socket.on('message', (message) => {
            // 아래 두개 뭐가 다르지...
            setMessages(messages => [...messages, message]);
            //         setMessages([...messages, message]);
        });

        socket.on("roomData", ({ users }) => {
            setUsers(users);
        });
    }, []);




    // function for sending messages

    const sendMessage = () => {
        if (message.msg) {
            socket.emit('sendMessage', message, () => setMessage({ msg: '', time: '', url: '', fileName: '', userIcon: '', }));
        }

        if (message.url) {
            socket.emit('sendMessage', message, () => setMessage({ msg: '', time: '', url: '', fileName: '', userIcon: '', }));
        }
    }

    return (

        <div className="outerContainer">
            <div className="container">
                <InfoBar room={room} users={users} />
                <Messages messages={messages} name={name} icon={icon} />
                <Input message={message} setMessage={setMessage} sendMessage={sendMessage} icon={icon} />
            </div>
        </div>
    )
}

export default Chat;



























// import React, { useState, useEffect } from 'react';
// import queryString from 'query-string';
// import io from 'socket.io-client';
// import './Chat.css';
// import TextContainer from '../TextContainer/TextContainer';
// import InfoBar from '../InfoBar/InfoBar';
// import Input from '../Input/Input';
// import Messages from '../Messages/Messages';

// let socket;

// const Chat = ({ location }) => {
//     const [name, setName] = useState('');
//     const [room, setRoom] = useState('');
//     const [users, setUsers] = useState('');
//     const [time, setTime] = useState();
//     const [message, setMessage] = useState({
//         msg: '',
//         time: '',
//         url: '',
//         fileName: '',

//     });
//     const [messages, setMessages] = useState([]);
//     const [image, setImage] = useState();
//     const ENDPOINT = 'localhost:5000';

//     useEffect(() => {
//         const { name, room } = queryString.parse(location.search); // 쿼리스트링 문자열을 객체로
//         console.log(queryString.parse(location.search));
//         socket = io(ENDPOINT);

//         setName(name);
//         setRoom(room);

//         // console.log(socket)
//         // emit 이벤트를 발생시킨다 즉 요청을 한다. 서버측이던 클라이언트 측이던 상관없이 이벤트를 발생시키기위해선 emit을 사용한다.
//         socket.emit('join', { name, room }, (error) => {
//             if (error) {
//                 alert(error);
//             }
//         });

//         return () => {
//             socket.emit('disconnect');

//             socket.off();

//         }
//     }, [ENDPOINT, location.search]);



//     useEffect(() => {
//         socket.on('message', (message) => {
//             console.log('메세지 받는곳으로 들어옴')
//             // 아래 두개 뭐가 다르지...
//             setMessages(messages => [...messages, message]);
//             //         setMessages([...messages, message]);
//         });

//         socket.on("roomData", ({ users }) => {
//             setUsers(users);
//         });
//     }, []);




//     // function for sending messages

//     const sendMessage = () => {
//         console.log('sendMessage로 들어옴')
//         console.log(message);
//         if (message.msg) {
//             socket.emit('sendMessage', message, () => setMessage({ msg: '', time: '', img: {} }));
//         }

//         console.log('url: ' + message.url);
//         if (message.url) {
//             console.log('URL: ' + message.url);
//             socket.emit('sendMessage', message, () => setMessage({ msg: '', time: '', img: {} }));
//         }
//     }
//     console.log(message, messages);

//     return (
//         <div className="outerContainer">
//             <div className="container">
//                 <InfoBar room={room} />
//                 <Messages messages={messages} name={name} />
//                 <Input time={time} setTime={setTime} message={message} setMessage={setMessage} sendMessage={sendMessage} image={image} setImage={setImage} />
//             </div>
//             <TextContainer users={users} />
//         </div>
//     )
// }

// export default Chat;





















// // 오리지날 코드
// import React, { useState, useEffect } from "react";
// import queryString from 'query-string';
// import io from "socket.io-client";

// import TextContainer from '../TextContainer/TextContainer';
// import Messages from '../Messages/Messages';
// import InfoBar from '../InfoBar/InfoBar';
// import Input from '../Input/Input';

// import './Chat.css';

// const ENDPOINT = 'https://project-chat-application.herokuapp.com/';

// let socket;

// const Chat = ({ location }) => {
//     const [name, setName] = useState('');
//     const [room, setRoom] = useState('');
//     const [users, setUsers] = useState('');
//     const [message, setMessage] = useState('');
//     const [messages, setMessages] = useState([]);

//     useEffect(() => {
//         const { name, room } = queryString.parse(location.search);

//         socket = io(ENDPOINT);

//         setRoom(room);
//         setName(name)

//         socket.emit('join', { name, room }, (error) => {
//             if (error) {
//                 alert(error);
//             }
//         });
//     }, [ENDPOINT, location.search]);

//     useEffect(() => {
//         socket.on('message', message => {
//             setMessages(messages => [...messages, message]);
//         });

//         socket.on("roomData", ({ users }) => {
//             setUsers(users);
//         });
//     }, []);

//     const sendMessage = (event) => {
//         event.preventDefault();

//         if (message) {
//             socket.emit('sendMessage', message, () => setMessage(''));
//         }
//         console.log(message, messages);

//     }

//     return (
//         <div className="outerContainer">
//             <div className="container">
//                 <InfoBar room={room} />
//                 <Messages messages={messages} name={name} />
//                 <Input message={message} setMessage={setMessage} sendMessage={sendMessage} />
//             </div>
//             <TextContainer users={users} />
//         </div>
//     );
// }

// export default Chat;
