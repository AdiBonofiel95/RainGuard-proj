import { Button, TextField } from '@mui/material';
import React from 'react'
import Grid from '@mui/material/Unstable_Grid2';
import { ChatProps } from '../types/Types';

function Chat(props: ChatProps) {
  const [chat, setChat] = React.useState([''])
  const messageFocus = React.useRef<HTMLDivElement>(null);
  const inputRef = React.useRef<HTMLInputElement>(null);


  React.useEffect(() => {
    props.socket.connect();

    props.socket.on('recive message', (msg) => {
      setChat((prevChat) => [...prevChat,`${msg.userName}: ${msg.content}`]);
    });

    props.socket.on('connection status message', (msg) => {
      setChat((prevChat) => [...prevChat,`${msg}`]);
    });

    if(messageFocus.current) {
      messageFocus.current.scrollTop = messageFocus.current.scrollHeight;
    }
  
    return () => {
      props.socket.off('recive message');
      props.socket.off('connection status message');
    };
  }, [chat])

  const onSendClick = () => {
    if(inputRef.current && inputRef.current.value !== ''){
      props.socket.emit('send message', {message: inputRef.current.value});
      inputRef.current.value = '';
    }
  }

  return (
    <Grid 
      container 
      flexDirection={'column'}
      alignContent={'center'}
      alignItems={'center'}
      width={'90vw'} 
      height={'80vh'}
    >
      <Grid 
        container 
        flexDirection={'row-reverse'} 
        height={'90%'} 
        width={'80%'} 
        overflow={'auto'} 
        alignContent={'flex-start'}
        ref={messageFocus}
      >
        {chat.map(msg => (
          <Grid container xs={12}>
            <p>{msg}</p>
          </Grid>
        ))}
      </Grid>
      <Grid container alignItems={'center'} gap={0.5}>
        <TextField placeholder='Write Message Here' variant="outlined" inputRef={inputRef}/>
        <Button variant="contained" onClick={onSendClick}>Send</Button>
      </Grid>
    </Grid>
  )
}

export default Chat