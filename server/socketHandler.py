from flask_socketio import SocketIO, join_room, leave_room, emit
from flask import session
import os 


class SocketHandler:
    def __init__(self, app, chat_room_manager) -> None:
        self.__chat_room_manager = chat_room_manager
        self.__socketIo = SocketIO(app, cors_allowed_origins='http://localhost:3000')
        
        self.__socketIo.on_event('connect', self.__connect)
        self.__socketIo.on_event('disconnect', self.__disconnect)
        self.__socketIo.on_event('send message', self.__send_message)


    def __connect(self, auth):
        room = session.get("chatRoom")
        user_name = session.get("userName")
        if not room or not user_name:
            return
        if not self.__chat_room_manager.is_room_available(room):
            leave_room(room)
            return
        
        connection_message = f'{user_name} has joined the room'
        emit('connection status message', connection_message, to=room)
        join_room(room)
        print(f'{user_name} joined the room on port {room}')
        self.__chat_room_manager.print_all_opened_ports()


    def __disconnect(self):
        print(f'disconnection request was sent')
        room = session.get("chatRoom")
        user_name = session.get("userName")

        self.__chat_room_manager.disconnect_from_room(room)
        leave_room(room)
        disconnection_message = f'{user_name} has left the room'
        emit('connection status message', disconnection_message, to=room)
        session.clear()

        self.__chat_room_manager.print_all_opened_ports()

    
    def __send_message(self, data):
        room = session.get("chatRoom")
        if not self.__chat_room_manager.is_room_available(room):
            return 
        
        print(f'A message was sent')
        message = {"userName" : session.get("userName"),
                "content": data['message']}
        print(f'sent out: {message}')
        emit('recive message', message, to=room)

    
    def run_app(self, app, debug=False):
        print(os.getenv('SERVER_PORT'))
        self.__socketIo.run(app, debug=debug, host='0.0.0.0', port=8000)