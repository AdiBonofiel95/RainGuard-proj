import { ChatFormData, FormErrors } from "../types/Types";

export function validateChatForm (data: ChatFormData):FormErrors {
    let errors:FormErrors = {};

    if(data.userName === ''){
        errors.userNameError = "user name missing";
    }
    if(data.portNumber < 1000 || data.portNumber > 9999){
        errors.portNumberError = "must add port number between 1000 to 9999";
    }

    return errors
}

export function postInititSocket(chatFormData: ChatFormData) {
    const requestOptions = {
        method: 'POST',
        headers: {'Accept': 'application/json', 'Content-Type': 'application/json'},
        credentials: 'include' as RequestCredentials,
        body: JSON.stringify(chatFormData)
    };


    return fetch(process.env.REACT_APP_BACKEND_ENDPOINT ?? '', requestOptions);
}