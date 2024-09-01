from flask import Flask, request, session, redirect
from chatRoomManager import ChatRoomManager
from flask_cors import CORS
from socketHandler import SocketHandler
from serverLogger import setup_logger

app = Flask(__name__)
app.config["SECRET_KEY"] = "adibono12345"
app.config["SESSION_COOKIE_SAMESITE"] = "None"
app.config["SESSION_COOKIE_SECURE"] = True
CORS(app, supports_credentials=True, resources='*')
chat_room_manager = ChatRoomManager()
socket_handler = SocketHandler(app, chat_room_manager)
setup_logger()

@app.before_request
def log_request():
    message = f'Incoming request: {request.method} {request.url} from \
    {request.remote_addr} \n data:{request.data}'
    app.logger.info(message)

@app.after_request
def log_response_info(response):
    app.logger.info(f'Request handled: {request.method} {request.url} returned {response.status_code}')
    return response

@app.get('/')
def home_get():
    session.clear()
    return redirect('http://localhost:3000')

# this part is for debugging 
@app.get('/chat')
def chat_get():
    print("get request was sent")
    print(session)
    print(session.get("chatRoom"))
    return 'ok'

@app.post('/')
def home_post():
    session.clear()
    data = request.get_json()
    session["userName"] = data['userName']
    session["chatRoom"] = chat_room_manager.get_room(data['portNumber'])
    return 'ok'


if __name__ == "__main__":
    socket_handler.run_app(app, True)