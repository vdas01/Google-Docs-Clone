import {Server} from 'socket.io'
import Connection from './db/db.js';
import { getDocument,updateDocument } from './Controller/DocumentController.js';

const port = 9000;

Connection();
const io = new Server(port,{
    cors:{
        origin:'http://localhost:3000',
        methods:['GET','POST']
    }
});

io.on('connection',socket => {

    socket.on('get-document', async documentId=>{
       const data=""
       const document =await getDocument(documentId);
       socket.join(documentId);
       socket.emit('load-document',document.data);


        //to catch changes
         socket.on('send-changes',delta=>{
        //to broadcast to all user using receive-changes event
        socket.broadcast.emit('receive-changes',delta)
        //to send only particular document id
        socket.broadcast.to(documentId).emit('receive-changes',delta)
        console.log(delta);
         })

        socket.on('save-document',async data => {
            await updateDocument(documentId,data);
        })
    })

    
});
