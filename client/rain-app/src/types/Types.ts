import { Socket } from 'socket.io-client';


export type FormErrors = {
    userNameError?: string,
    portNumberError?: string
}

export type ChatFormData = {
    userName: string,
    portNumber: number
}

export type ChatProps = {socket: Socket}