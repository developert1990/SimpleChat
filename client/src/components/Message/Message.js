import React from 'react';
import { Avatar } from 'antd';
import './Message.css';

const Message = ({ message: { text, user, time, url, fileName, userIcon }, name, icon }) => {
    let isSentByCurrentUser = false;

    const trimmedName = name.trim().toLowerCase();
    const API_BASE = 'https://react-chat-application-hong.herokuapp.com';
    if (user === trimmedName) {
        isSentByCurrentUser = true;
    }

    return (

        isSentByCurrentUser
            ?
            // 사용자(나)
            (
                <div className="messageContainer justifyEnd msgOuterContainer">
                    <div className="message-username-time">
                        <div className="myname">{trimmedName}</div>
                        <div className="message-time myMessage-time">
                            <div className="time">{time}</div>
                            <div className="messageBox backgroundRed">

                                {
                                    url && url.substring(0, 6) === "public"

                                        ?

                                        url.substring(url.length - 3, url.length) === 'mp4' ?
                                            <video
                                                style={{ maxWidth: '200px' }}
                                                src={`${API_BASE}/uploads/${fileName}`}
                                                alt="video"
                                                type="video/mp4"
                                                controls />
                                            :

                                            <img
                                                style={{ maxWidth: '200px' }}
                                                src={`${API_BASE}/uploads/${fileName}`}
                                                alt="img" />
                                        :

                                        <p className="messageText colorWhite">{text}</p>
                                }
                            </div>
                        </div>
                    </div>
                    {icon === '' ?
                        <Avatar className="string-avatar" alt="img">{`${name.charAt(0).toUpperCase()}`}</Avatar>
                        :
                        <Avatar src={`/images/${icon}`} alt="img" />
                    }

                </div>
            )
            :
            // 다른 사용자들
            (
                <div className="messageContainer justifyStart msgOuterContainer">
                    {user === 'admin'
                        ?
                        <Avatar src={`/images/icons/${userIcon}`} alt="img" />
                        :
                        <Avatar src={`/images/${userIcon}`} alt="img" />
                    }
                    <div className="message-username-time">
                        <div className="username">{user}</div>
                        <div className="message-time">
                            <div className="messageBox backgroundLight">
                                {

                                    url && url.substring(0, 6) === "public"
                                        ?
                                        url.substring(url.length - 3, url.length) === 'mp4' ?
                                            <video
                                                style={{ maxWidth: '200px' }}
                                                src={`http://localhost:5000/uploads/${fileName}`}
                                                alt="video"
                                                type="video/mp4"
                                                controls />
                                            :
                                            <img
                                                style={{ maxWidth: '200px' }}
                                                src={`http://localhost:5000/uploads/${fileName}`}
                                                alt="img" />
                                        :
                                        <p className="messageText colorDark">{text}</p>
                                }

                            </div>
                            <div className="time">{time}</div>
                        </div>
                    </div>


                </div>
            )
    );
}

export default Message;











// import React from 'react';
// import { Avatar } from 'antd';
// import './Message.css';

// const Message = ({ message: { text, user, time, url, fileName }, name }) => {
//     // console.log('message: ' + url);

//     let isSentByCurrentUser = false;

//     const trimmedName = name.trim().toLowerCase();

//     if (user === trimmedName) {
//         isSentByCurrentUser = true;
//     }


//     return (

//         isSentByCurrentUser
//             ? (
//                 <div className="messageContainer justifyEnd">
//                     <p className="sentText pr-10">{trimmedName}</p>
//                     <p>{time}</p>
//                     <Avatar src="/images/32.png" alt="img" />
//                     <div className="messageBox backgroundBlue">

//                         {
//                             url && url.substring(0, 6) === "public"

//                                 ?

//                                 url.substring(url.length - 3, url.length) === 'mp4' ?
//                                     <video
//                                         style={{ maxWidth: '200px' }}
//                                         src={`http://localhost:5000/uploads/${fileName}`}
//                                         alt="video"
//                                         type="video/mp4"
//                                         controls />
//                                     :

//                                     <img
//                                         style={{ maxWidth: '200px' }}
//                                         src={`http://localhost:5000/uploads/${fileName}`}
//                                         alt="img" />
//                                 :

//                                 <p className="messageText colorWhite">{text}</p>
//                         }
//                     </div>
//                 </div>
//             )
//             : (
//                 <div className="messageContainer justifyStart">
//                     <p>{time}</p>
//                     <div className="messageBox backgroundLight">
//                         {

//                             url && url.substring(0, 6) === "public"
//                                 ?
//                                 url.substring(url.length - 3, url.length) === 'mp4' ?
//                                     <video
//                                         style={{ maxWidth: '200px' }}
//                                         src={`http://localhost:5000/uploads/${fileName}`}
//                                         alt="video"
//                                         type="video/mp4"
//                                         controls />
//                                     :
//                                     <img
//                                         style={{ maxWidth: '200px' }}
//                                         src={`http://localhost:5000/uploads/${fileName}`}
//                                         alt="img" />
//                                 :
//                                 <p className="messageText colorDark">{text}</p>
//                         }

//                     </div>
//                     <p className="sentText pl-10 ">{user}</p>
//                 </div>
//             )
//     );
// }

// export default Message;













// // 오리지날 코드
// import React from 'react';

// import './Message.css';

// import ReactEmoji from 'react-emoji';

// const Message = ({ message: { text, user }, name }) => {
//     let isSentByCurrentUser = false;

//     const trimmedName = name.trim().toLowerCase();

//     if (user === trimmedName) {
//         isSentByCurrentUser = true;
//     }

//     return (
//         isSentByCurrentUser
//             ? (
//                 <div className="messageContainer justifyEnd">
//                     <p className="sentText pr-10">{trimmedName}</p>
//                     <div className="messageBox backgroundBlue">
//                         <p className="messageText colorWhite">{ReactEmoji.emojify(text)}</p>
//                     </div>
//                 </div>
//             )
//             : (
//                 <div className="messageContainer justifyStart">
//                     <div className="messageBox backgroundLight">
//                         <p className="messageText colorDark">{ReactEmoji.emojify(text)}</p>
//                     </div>
//                     <p className="sentText pl-10 ">{user}</p>
//                 </div>
//             )
//     );
// }

// export default Message;