import React from 'react';

import ScrollToBottom from 'react-scroll-to-bottom';

import Message from '../Message/Message';

import './Messages.css';

const Messages = ({ messages, name, icon }) => (

    <ScrollToBottom className="messages">
        {messages.map((message, i) => <div key={i}><Message message={message} name={name} icon={icon} /></div>)}
    </ScrollToBottom>
);

export default Messages;












// // import React from 'react';

// // import ScrollToBottom from 'react-scroll-to-bottom';

// // import Message from '../Message/Message';

// // import './Messages.css';

// // const Messages = ({ messages, name }) => (
// //     <ScrollToBottom className="messages">
// //         {messages.map((message, i) => <div key={i}><Message message={message} name={name} /></div>)}
// //     </ScrollToBottom>
// // );

// // export default Messages;













// // 오리지날 코드
// import React from 'react';

// import ScrollToBottom from 'react-scroll-to-bottom';

// import Message from '../Message/Message';

// import './Messages.css';

// const Messages = ({ messages, name }) => (
//     <ScrollToBottom className="messages">
//         {messages.map((message, i) => <div key={i}><Message message={message} name={name} /></div>)}
//     </ScrollToBottom>
// );

// export default Messages;





