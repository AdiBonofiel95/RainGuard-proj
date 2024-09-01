

class ChatRoomManager:

    def __init__(self) -> None:
        self.__rooms = {}

    def get_room(self, port_number) -> int :
        self.__rooms[port_number] = 1 if port_number not in self.__rooms else self.__rooms[port_number] + 1
        return port_number
    
    def disconnect_from_room(self, port_number) -> None:
        self.__rooms[port_number] -= 1
        if (self.__rooms[port_number] == 0):
            del self.__rooms[port_number]
    
    def is_room_available(self, port_number) -> bool:
        return port_number in self.__rooms
    
    def print_all_opened_ports(self):
        print("print all")
        for room in self.__rooms:
            print(f'{room}, connected to the room: {self.__rooms[room]}')
        