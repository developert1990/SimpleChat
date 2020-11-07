import React, { useEffect, useRef, useState } from 'react';
import './Input.css';
import Dropzone from 'react-dropzone';
import axios from 'axios';

import 'emoji-mart/css/emoji-mart.css'



const Input = ({ message, setMessage, sendMessage, icon }) => {

    const [getImage, setGetImage] = useState(0);

    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const timeLine = `${hours > 12 ? hours % 12 : hours}:${minutes < 10 ? '0' + minutes : minutes} ${hours >= 12 ? 'PM' : 'AM'}`;
    const focusMsgRef = useRef();
    useEffect(() => {
        focusMsgRef.current.focus();
    }, [message])


    const onDrop = async (files) => {
        const formData = new FormData();

        formData.append("file", files[0]);
        // console.log(formData);
        axios
            .post(`http://localhost:5000/upload`, formData)
            .then(res => {
                // console.log(res.data);
                if (res.data.success) {
                    setMessage({
                        msg: '',
                        time: timeLine,
                        url: res.data.url,
                        fileName: res.data.fileName
                    });
                    setGetImage(getImage + 1);
                }

            })
            .catch(err => {
                console.error(err);
            });

    }


    useEffect(() => {
        sendMessage(message);
    }, [getImage]);




    return (

        <div className="form">
            <input
                className="input"
                type="text"
                placeholder="Type a message..."
                value={message.msg}
                // onChange={({ target: { value } }) => setMessage({ msg: value, time: timeLine })}
                onChange={(event) => setMessage({ msg: event.target.value, time: timeLine, userIcon: icon })}
                onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
                ref={focusMsgRef}
            />
            <Dropzone onDrop={onDrop}>
                {({ getRootProps, getInputProps }) => (
                    <section className="dropzone-section">
                        <div {...getRootProps()} >
                            <input {...getInputProps()} />
                            <img className="clip-img" src="/images/icons/clip.png" alt="clip" />
                        </div>
                    </section>
                )}
            </Dropzone>

            <button type="submit" className="sendButton" onClick={(event) => sendMessage()}>Send</button>
        </div>
    )
}

export default Input;























// import React, { useEffect, useRef, useState } from 'react';
// import './Input.css';
// // import { Form, Icon, Button, Row, Col, } from 'antd';
// import Dropzone from 'react-dropzone';
// import { Upload, message, Button } from 'antd';
// import { UploadOutlined } from '@ant-design/icons';
// import axios from 'axios';

// import 'emoji-mart/css/emoji-mart.css'



// const Input = ({ time, setTime, message, setMessage, sendMessage, setImage, image }) => {

//     const [getImage, setGetImage] = useState(0);

//     const date = new Date();
//     const hours = date.getHours();
//     const minutes = date.getMinutes();
//     const timeLine = `${hours}:${minutes}PM`;

//     const focusMsgRef = useRef();
//     useEffect(() => {
//         focusMsgRef.current.focus();
//     }, [message])


//     const onDrop = async (files) => {
//         console.log(files);
//         const formData = new FormData();
//         const config = {
//             header: { 'content-type': 'multipart/form-data' }
//         }
//         formData.append("file", files[0]);
//         console.log(formData);
//         axios
//             .post(`http://localhost:5000/upload`, formData)
//             .then(res => {
//                 console.log(res.data);
//                 if (res.data.success) {
//                     setMessage({
//                         msg: '',
//                         time: timeLine,
//                         url: res.data.url,
//                         fileName: res.data.fileName
//                     });
//                     setGetImage(getImage + 1);
//                 }

//             })
//             .then(console.log(message))
//             .catch(err => {
//                 console.error(err);
//             });

//     }


//     useEffect(() => {
//         console.log('여기로 들어옴')
//         sendMessage(message);
//     }, [getImage]);




//     return (

//         <div className="form">
//             <input
//                 className="input"
//                 type="text"
//                 placeholder="Type a message..."
//                 value={message.msg}
//                 // onChange={({ target: { value } }) => setMessage({ msg: value, time: timeLine })}
//                 onChange={(event) => setMessage({ msg: event.target.value, time: timeLine })}
//                 onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
//                 ref={focusMsgRef}
//             />
//             <Dropzone onDrop={onDrop}>
//                 {({ getRootProps, getInputProps }) => (
//                     <section className="dropzone-section">
//                         <div {...getRootProps()} >
//                             <input {...getInputProps()} />
//                             <Button icon={<UploadOutlined className="dropzone" />}></Button>
//                         </div>
//                     </section>
//                 )}
//             </Dropzone>

//             <button type="submit" className="sendButton" onClick={(event) => sendMessage()}>Send</button>
//         </div>
//     )
// }

// export default Input;
















// // 오리지날 코드
// import React from 'react';

// import './Input.css';

// const Input = ({ setMessage, sendMessage, message }) => (
//     <form className="form">
//         <input
//             className="input"
//             type="text"
//             placeholder="Type a message..."
//             value={message}
//             onChange={({ target: { value } }) => setMessage(value)}
//             onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
//         />
//         <button className="sendButton" onClick={e => sendMessage(e)}>Send</button>
//     </form>
// )

// export default Input;