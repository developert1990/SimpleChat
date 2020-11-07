
const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');


const multer = require('multer');
const fs = require('fs');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const router = require('./router');

const app = express();
const server = http.createServer(app);
const io = socketio(server);

app.use(cors());
app.use(router);
// 이렇게 미들웨어로 public 폴더를 정적으로 만들어줘야 외부에서 로컬호스트의 이 public 폴더로 접속을 할 수가 있다.
app.use(express.static("public"));
// Chat 컴포넌트에서 23번 줄에 socket = io(localhost:5000)으로 서버에 요청을 함으로써 이쪽으로 connect 하게 된다.
io.on('connect', (socket) => {
    // console.log('We have a new connection!!!');
    // console.log('socket id : ' + socket.id); // 고유한 id가 자동으로 생성이된다.

    // on : emit 으로 보낸 요청을 on 으로 응답한다.
    socket.on('join', ({ name, room, icon }, callback) => {// 클라이언트측 component인 Chat에서 emit('join') 을 사용했으므로 'join'이라는 이벤트를 여기서 받는다.
        const { error, user } = addUser({ id: socket.id, name, room, icon });

        if (error) {
            console.log('error 발생함')
            return callback(error);
        }

        socket.join(user.room);

        // 사용자가 채팅창에 들어오면 화면에 자동으로 출력된다.
        socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.`, userIcon: 'chat2.png' });
        // 어떠한 사용자가 들어오면 자신을 제외한 나머지 사람에게 메세지를 서버를 거치지 않고 바로 띄워줄때 broadcast 를 사용한다.
        socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!`, userIcon: 'chat2.png' });

        // 어떠한 특정한 room이나 사람에게 메세지를 전달할때 io.to 를 사용한다.
        io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

        callback();// 이렇게 콜백을 지정함으로써 함수가 실행되고 프론트에서 다시 새로운 요청이나 일을 할수가 있다.
    });

    socket.on('sendMessage', (message, callback) => {
        console.log('userIcon: ' + message.userIcon);
        const user = getUser(socket.id); // 메세지를 보낸 유저의 id를 socket을 통해서 가져올수 있다.
        console.log('img: ' + message.url);
        console.log('Icon 뽑기: ' + message);
        io.to(user.room).emit('message', { user: user.name, time: message.time, text: message.msg, url: message.url, fileName: message.fileName, userIcon: message.userIcon });

        callback();
    });

    socket.on('disconnect', () => {
        // console.log('User had left!!!');
        const user = removeUser(socket.id);

        if (user) {
            io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
            io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
        }
    })
});


// 사진 비디오 파일 요청 받고 저장
const storage = multer.diskStorage({
    destination: "./public/uploads/",
    filename: function (req, file, cb) {
        cb(null, `${Date.now()}_${file.originalname}`);
    },
    // fileFilter: (req, file, cb) => {
    //     const ext = path.extname(file.originalname)
    //     if(ext !== '.jpg' && ext !== '.png' && ext !== '.mp4'){
    //         return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
    //     }
    //     cb(null, ture);
    // }

})


// const upload = multer({
//     storage: storage,
//     limits: { fileSize: 10000000 }
// });

// app.post("/upload", upload.single("file"), function (req, res, next) {
//     console.log(req.file);
//     res.send({
//         success: true, url: res.req.file.path, fileName: req.file.filename
//     });
// });


const upload = multer({ storage: storage }).single("file");

app.post("/upload", (req, res) => {
    console.log('파일 업로드 하는곳으로 들어옴');
    console.log(req.file);
    upload(req, res, err => {
        if (err) { return res.json({ success: false, err }) }
        console.log('path: ' + req.file.path);
        return res.json({ success: true, url: res.req.file.path, fileName: req.file.filename });
    });
})






server.listen(process.env.PORT || 5000, () => console.log(`Server has started with ${process.env.PORT}`));


































// // const http = require('http');
// // const express = require('express');
// // const socketio = require('socket.io');
// // const PORT = 5000;
// // const cors = require('cors');


// // const multer = require('multer');
// // const fs = require('fs');

// // const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

// // const router = require('./router');

// // const app = express();
// // const server = http.createServer(app);
// // const io = socketio(server);

// // app.use(cors());
// // app.use(router);
// // app.use(express.static("public"));
// // // Chat 컴포넌트에서 23번 줄에 socket = io(localhost:5000)으로 서버에 요청을 함으로써 이쪽으로 connect 하게 된다.
// // io.on('connect', (socket) => {
// //     // console.log('We have a new connection!!!');
// //     // console.log('socket id : ' + socket.id); // 고유한 id가 자동으로 생성이된다.

// //     // on : emit 으로 보낸 요청을 on 으로 응답한다.
// //     socket.on('join', ({ name, room }, callback) => {// 클라이언트측 component인 Chat에서 emit('join') 을 사용했으므로 'join'이라는 이벤트를 여기서 받는다.
// //         const { error, user } = addUser({ id: socket.id, name, room });

// //         if (error) return callback(error);

// //         socket.join(user.room);

// //         // 사용자가 채팅창에 들어오면 화면에 자동으로 출력된다.
// //         socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.` });
// //         // 어떠한 사용자가 들어오면 자신을 제외한 나머지 사람에게 메세지를 서버를 거치지 않고 바로 띄워줄때 broadcast 를 사용한다.
// //         socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

// //         // 어떠한 특정한 room이나 사람에게 메세지를 전달할때 io.to 를 사용한다.
// //         io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

// //         callback();// 이렇게 콜백을 지정함으로써 함수가 실행되고 프론트에서 다시 새로운 요청이나 일을 할수가 있다.
// //     });

// //     socket.on('sendMessage', (message, callback) => {
// //         const user = getUser(socket.id); // 메세지를 보낸 유저의 id를 socket을 통해서 가져올수 있다.

// //         io.to(user.room).emit('message', { user: user.name, text: message });

// //         callback();
// //     });

// //     socket.on('disconnect', () => {
// //         // console.log('User had left!!!');
// //         const user = removeUser(socket.id);

// //         if (user) {
// //             io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
// //             io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
// //         }
// //     })
// // });

// // const storage = multer.diskStorage({
// //     destination: "./public/uploads/",
// //     filename: function (req, file, cb) {
// //         cb(null, `${Date.now()}_${file.originalname}`);
// //     },
// //     // fileFilter: (req, file, cb) => {
// //     //     const ext = path.extname(file.originalname)
// //     //     if(ext !== '.jpg' && ext !== '.png' && ext !== '.mp4'){
// //     //         return cb(res.status(400).end('only jpg, png, mp4 is allowed'), false);
// //     //     }
// //     //     cb(null, ture);
// //     // }

// // })


// // // const upload = multer({
// // //     storage: storage,
// // //     limits: { fileSize: 10000000 }
// // // });

// // // app.post("/upload", upload.single("file"), function (req, res, next) {
// // //     console.log(req.file);
// // //     res.send({
// // //         success: true, url: res.req.file.path, fileName: req.file.filename
// // //     });
// // // });


// // const upload = multer({ storage: storage }).single("file");

// // app.post("/upload", (req, res) => {
// //     console.log('파일 업로드 하는곳으로 들어옴');
// //     console.log(req.file);
// //     upload(req, res, err => {
// //         if (err) { return res.json({ success: false, err }) }
// //         console.log('path: ' + req.file.path);
// //         return res.json({ success: true, url: res.req.file.path, fileName: req.file.filename });
// //     });
// // })






// // server.listen(PORT || 5000, () => console.log(`Server has started with ${PORT}`));





















// // 오리지날 코드
// const http = require('http');
// const express = require('express');
// const socketio = require('socket.io');
// const cors = require('cors');

// const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

// const router = require('./router');

// const app = express();
// const server = http.createServer(app);
// const io = socketio(server);

// app.use(cors());
// app.use(router);

// io.on('connect', (socket) => {
//     socket.on('join', ({ name, room }, callback) => {
//         const { error, user } = addUser({ id: socket.id, name, room });

//         if (error) return callback(error);

//         socket.join(user.room);

//         socket.emit('message', { user: 'admin', text: `${user.name}, welcome to room ${user.room}.` });
//         socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

//         io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

//         callback();
//     });

//     socket.on('sendMessage', (message, callback) => {
//         const user = getUser(socket.id);

//         io.to(user.room).emit('message', { user: user.name, text: message });

//         callback();
//     });

//     socket.on('disconnect', () => {
//         const user = removeUser(socket.id);

//         if (user) {
//             io.to(user.room).emit('message', { user: 'Admin', text: `${user.name} has left.` });
//             io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });
//         }
//     })
// });

// server.listen(process.env.PORT || 5000, () => console.log(`Server has started.`));