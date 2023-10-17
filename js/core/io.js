'use strict'

const axios = require('axios').default;
const server = require('http').createServer();
const io = require('socket.io')(server, {
  cors: { origin: '*' }
});

// keep track of all components that client sends
// List all Rooms Graphs
let roomGraphXmls = {};

/**
 * List all connections
 * @type {string: SocketIO.Socket}
 */
const sockets = {};

const users = [];
//un usuario puede tener varios navegadores abiertos.

const addUser = (id, name, room) => {
  const existingUser = users.find(user => user.id.trim().toLowerCase() === id.trim().toLowerCase());
  if (!name && !room) return { error: "Username and room are required" }
  if (!name) return { error: "Username is required" }
  if (!room) return { error: "Room is required" }
  // agregar el socket a la variable del usuario.
  const user = { id, name, room };
  if (!existingUser) users.push(user);
  return { user };
}

const deleteUser = (id) => {
  const index = users.findIndex((user) => user.id === id);
  if (index !== -1) return users.splice(index, 1)[0];
}

const findRoom = (room) => {
  let ok = false;
  Object.keys(roomGraphXmls).forEach((room_id) => {
    if (room_id == room) {
      ok = true;
      return;
    }
  });
  return ok;
}

const getUsersInRoom = (room) => {
  let usersInRoom = [];
  users.forEach(user => {
    if (user.room == room) {
      usersInRoom.push(user);
    }
  });
  return usersInRoom;
}

// Socket Server
io.on('connection', (socket) => {

  console.log('socket new connection... ' + socket.id);

  socket.on('login', async ({ name, room }) => {
    console.log('connect to login');
    // Validacion si existe usuario y sala en el backend...

    // consumir el endpoint para obtener el usuario por su token
    // le paso el token del usuario como parametro
    /* const responseUser = await axios.get('https://diagrama-backend.onrender.com/apis/user/' + name); */
    const responseUser = await axios.get('https://diagrama-backend.onrender.com/apis/user/' + name);

    // consumir el endpoint para obtener la el proyecto por su codigo/llave
    // le paso el codigo de la sala
    const responseProject = await axios.get('https://diagrama-backend.onrender.com/apis/cargar-salas/' + room);

    if ((responseUser.status === 200 && responseProject.status === 200) && responseUser.data.name && responseProject.data.nombre) {

      const { user, error } = addUser(name, responseUser.data.name, room);
      if (!error) {
        // Save the list of all connections to a variable
        sockets[socket.id] = { socket, user };
        let xmlString = '';
        if (!findRoom(room)) {
          roomGraphXmls[room] = responseProject.data.content || xmlString;
        }

        console.log("api cargar salas");
        console.log(room);
        xmlString = roomGraphXmls[room];
        console.log(xmlString);
        // join to room
        socket.join(user.room);
        // load_room title users
        const usersInRoom = getUsersInRoom(room);
        socket.emit('load_room_title', { title: responseProject.data.nombre, users: usersInRoom });
        io.in(room).emit('reload_users_room', { users: usersInRoom });
        // load draw_components 
        socket.emit('draw_component', { xml: xmlString });
      }
    } else {
      socket.emit('error_server', { error: true });
    }

  });

//carga el xml
  socket.on('draw_component', (data) => {
    if (data.room) {
      roomGraphXmls[data.room] = data.xml;
    }
    console.log('on draw_component');
    console.log(data.room);
    console.log(data.xml);
    socket.in(data.room).emit('draw_component', data);
  });

  socket.on('save_component', async (data) => {
    if (findRoom(data.room)) {
      // llamar al metodo para guardar el diagrama.
      // armo el body con el xml del diagrama
      const body = {
        content: roomGraphXmls[data.room]
      }
      console.log('gaurdar diagrama');
      console.log(body.content);
      console.log("###########################");
      // TODO: CAMBIAR A LA URL DE MI API
      const response = await axios.put('https://diagrama-backend.onrender.com/apis/guardar-diagrama/' + data.room, body);
      //console.log(response.status);
      let message = 'Ocurrio un error al guardar el diagrama.';
      if (response.status === 200) {
        message = 'Diagrama guardado con exito';
      }
      socket.emit('save_response', { message });

    }

  });


  // When disconnect, delete the socket with the variable
  socket.on('disconnect', () => {
    console.log('Socket disconnect...');
    let reDraw = true;
    const socketToDelete = { ...sockets[socket.id] };
    const user = socketToDelete['user'];
    delete sockets[socket.id];
    if (user) {
      Object.values(sockets).forEach((socket) => {
        if (socket.user.name == user.name) {
          reDraw = false;
        }

      });
      // si ese usuario no tiene ningun tab abierto, redibujar el editor y eliminar el usuario de la interfaz
      if (reDraw) {

        deleteUser(user.id);
        io.in(user.room).emit('remove_user_room', { userToRemove: user });
      }

    }

  });


});

//process.env.PORT ||9090
server.listen(9090);
console.log('servidor socket conectado en el puerto 9090');
module.exports = {
  sockets,
  server,
  io
}