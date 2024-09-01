import { useNavigate } from "react-router-dom";
import Button from '@mui/material/Button';
import Chat from '../components/Chat';
import { io } from 'socket.io-client';
import Grid from '@mui/material/Unstable_Grid2';


function ChatRoom() {

    const socketURL = 'http://127.0.0.1:8000';
    const socket = io(socketURL, {withCredentials:true, autoConnect: false});
    const navigate = useNavigate();

    const onBackClick = () => {
        socket.disconnect();
        navigate('/home');
    }

    return (
        <Grid container direction={'column'} alignItems={'center'}>
            <Grid container xs={12} justifyContent={'flex-start'} padding={0.8}>
                <Button variant="contained" onClick={onBackClick}>Quit</Button>
            </Grid>
            <Grid>
                <h1>Chat Room</h1>
            </Grid>
            <Grid>
                <Chat socket={socket}/>
            </Grid>
        </Grid>
    )
}

export default ChatRoom