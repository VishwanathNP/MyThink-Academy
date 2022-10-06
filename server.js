require('dotenv').config()
const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
const cookieParser = require('cookie-parser')
const fileUpload = require('express-fileupload')
const path = require('path')

const app = express()
app.use(express.json())
app.use(cors())
app.use(cookieParser())
app.use(fileUpload({
    useTempFiles: true
}))

// Connect to mongodb
const URI = process.env.MONGODB_URL
mongoose.connect(URI, {
    useCreateIndex: true,
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}, err => {
    if(err) throw err;
    console.log("Connected to mongodb")
})


// Routes
app.use('/admin', require('./routes/Users/Admin.Router'))
app.use('/teacher', require('./routes/Users/Teacher.Router'))
app.use('/parent', require('./routes/Users/Parent.Router'))
app.use('/student', require('./routes/Users/Student.Router'))
app.use('/api', require('./routes/uploadImage/upload'))
app.use('/api', require('./routes/Courses/Grade.Router'))
app.use('/api', require('./routes/Courses/Heading.Router'))
app.use('/api', require('./routes/Courses/Chapter.Router'))
app.use('/api', require('./routes/Courses/Topic.Router'))
app.use('/api', require('./routes/Teams/Team.Router'))
app.use('/api', require('./routes/Chat/Chatroom.Router'))
app.use('/api', require('./routes/Chat/Messages.Router'))

const http = require('http').createServer(app)
const PORT = process.env.PORT || 5000


const io = require('socket.io')(http, {
    cors: {
        origin: "http://localhost:3000",
        methods: ["GET", "POST"],
    }
})

const users = {};

const socketToRoom = {};

io.on('connection', socket => {
    socket.on("join room", roomID => {
        if (users[roomID]) {
            const length = users[roomID].length;
            if (length === 4) {
                socket.emit("room full");
                return;
            }
            users[roomID].push(socket.id);
        } else {
            users[roomID] = [socket.id];
        }
        socketToRoom[socket.id] = roomID;
        const usersInThisRoom = users[roomID].filter(id => id !== socket.id);

        socket.emit("all users", usersInThisRoom);
    });

    socket.on("sending signal", payload => {
        io.to(payload.userToSignal).emit('user joined', { signal: payload.signal, callerID: payload.callerID });
    });

    socket.on("returning signal", payload => {
        io.to(payload.callerID).emit('receiving returned signal', { signal: payload.signal, id: socket.id });
    });

    socket.on('disconnect', () => {
        const roomID = socketToRoom[socket.id];
        let room = users[roomID];
        if (room) {
            room = room.filter(id => id !== socket.id);
            users[roomID] = room;
        }
    });

});

if(process.env.NODE_ENV === 'production'){
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, 'client', 'build', 'index.html'))
    })
}


http.listen(PORT, () => {
    console.log('Server is running on port', PORT)
})




