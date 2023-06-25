import React, {ChangeEvent, FormEvent, useEffect, useRef, useState} from 'react';
import s from './Chat.module.css'
import {useLocation, useNavigate} from "react-router-dom";
import {Message} from "./Message/Message";
import {log} from "util";
import {ThemeType} from "../../App";

// const socket: Socket<any, any> = io();
// socket.connect('http://localhost:5000')

type ChatPropsType = {
    theme: ThemeType
}

type MessagesType = {data: {
    user: {name: string}
    message: string
}}

type ParamsType = {
    [key: string]: string
}

type messageRefValues = {
    offsetTop: number
    height: number
}

const io = require('socket.io-client');
const socket = io.connect('https://online-chat-mvor.onrender.com');

export const Chat = (props: ChatPropsType) => {
    const {search} = useLocation()
    const navigate = useNavigate()
    const [params, setParams] = useState<null|ParamsType>(null)
    const [messages, setMessages] = useState<MessagesType[]>([])
    const [messageValue, setMessageValue] = useState<string>('')
    const [users, setUsers] = useState(0)

    const [lastMessageIsVisible, setLastMessageIsVisible] = useState<boolean>(true)
    const [messageRef, setMessageRef] = useState<React.MutableRefObject<HTMLDivElement | null>>()

    useEffect(()=>{
        const searchParams = Object.fromEntries<string>(new URLSearchParams(search))
        setParams(searchParams)
        socket.emit('join', searchParams)
    }, [search])

    useEffect(()=>{
        socket.on('message',(data: any)=>{
            setMessages(state=>([...state, data]))
        })
    }, [])

    useEffect(()=>{
        socket.on('joinRoom',(data: any)=>{
            setUsers(data.data.users.length)
        })
    }, [])

    const handleSubmit = (e: FormEvent<HTMLFormElement>) =>{
        e.preventDefault()

        if (!messageValue) return

        socket.emit('sendMessage', {messageValue, params})
        setMessageValue('')
    }

    const leftRoomHandler =()=>{
        socket.emit('leftRoom', {params})
        navigate('/')
    }

    const onChangeHandler = (e: ChangeEvent<HTMLInputElement>) =>{
        setMessageValue(e.currentTarget.value)
    }

    const windowRef = useRef<HTMLDivElement | null>(null);

    const scrollToLastMessageHandler = () =>{
        messageRef?.current?.scrollIntoView({behavior: 'smooth'});
    }

    const wrapperClass = props.theme==='dark'?s.wrapper+' '+s.dark:s.wrapper

    return (
        <div className={wrapperClass}>
            <div className={s.desc}>
                <div className={s.inf}>
                    <span className={s.roomName}>{params?.room}</span>
                    <span className={s.users}>{users} users</span>
                </div>
                <button className={s.left} onClick={leftRoomHandler}>Left</button>
            </div>
            <div className={s.inner}>
                <div className={s.messages} ref={windowRef}>
                    {messages.map((e, i)=> {
                        return <Message key={i}
                                        message={e.data.message}
                                        user={e.data.user.name}
                                        name={params!.name}
                                        messagesCount={messages.length}
                                        index={i}
                                        setLastMessageIsVisible={setLastMessageIsVisible}
                                        setMessageRef={setMessageRef}
                                        theme={props.theme}
                        />
                    })}
                </div>
                {!lastMessageIsVisible&&<div className={s.messageIndicator}
                                             onClick={scrollToLastMessageHandler}>↓</div>}
                <form className={s.form} onSubmit={handleSubmit}>
                    <input className={s.input}
                           type="text"
                           name={'message'}
                           value={messageValue}
                           onChange={onChangeHandler}
                           placeholder={'Tell something'}
                           autoComplete={'off'}
                           required/>
                    <button className={s.messageBtn} type={'submit'}>enter</button>
                </form>
            </div>
        </div>
    );
};

