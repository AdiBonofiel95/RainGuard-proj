import { Button, TextField } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom';
import Grid from '@mui/material/Unstable_Grid2';
import { ChatFormData, FormErrors } from '../types/Types';
import { postInititSocket, validateChatForm } from '../services/ChatServices';

function ChatInitForm() {
    const [errors, setErrors] = React.useState<FormErrors>({});
    const chatForm:React.MutableRefObject<ChatFormData> = React.useRef({userName: '', portNumber: 0});
    const navigate = useNavigate();

    const onUsernameChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        chatForm.current.userName = event.target.value;
    }
    
    const onPortNumberChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        chatForm.current.portNumber = Number(event.target.value);
    }

    const onSubmit = () => {
        const newErrors = validateChatForm(chatForm.current);
        setErrors(newErrors);
        if(Object.keys(newErrors).length === 0){
            postInititSocket(chatForm.current).then(res => {
                if (res.ok){
                    navigate('/chat');
                }
                else {
                    alert("something went wrong - not able to fetch")
                }
            })
        }
    }

    return (
        <Grid 
            container 
            flexDirection={'column'} 
            alignContent={'center'} 
            alignItems={'center'} 
            minHeight={'100vh'}
            justifyContent={'center'}
            gap={1}
        >
            <div style={{display: 'flex', gap: 10}}>
                <TextField 
                    label="User-Name" 
                    variant="outlined" 
                    onChange={onUsernameChange}
                    error={errors.userNameError ? true : false}
                    helperText={errors.userNameError}
                />
                <TextField 
                    label="Port-Number" 
                    type='number' 
                    variant="outlined" 
                    onChange={onPortNumberChange}
                    error={errors.portNumberError ? true : false}
                    helperText={errors.portNumberError}
                />
            </div>
            <div>
                <Button variant="contained" onClick={onSubmit}>Enter</Button>
            </div>
        </Grid>
    )
}

export default ChatInitForm