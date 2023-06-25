import React, {useEffect, useRef} from 'react';
import s from './Message.module.css'
import {useIsVisible} from "../../../utills/useIsVisible";
import {log} from "util";
import {ThemeType} from "../../../App";

type MessagePropsType = {
    user: string
    message: string
    name: string
    messagesCount: number
    index: number
    setLastMessageIsVisible: (visible: boolean) => void
    setMessageRef: (ref: React.MutableRefObject<HTMLDivElement | null>) => void
    theme: ThemeType
}

export const Message: React.FC<MessagePropsType> = (
    {
        user,
        message,
        name,
        messagesCount,
        index,
        setLastMessageIsVisible,
        setMessageRef,
        theme
    }
) => {

    useEffect(() => {
        if (messagesCount===index+1&&isMe){
            document.querySelector('.Chat_messages__UMxjL')?.scrollTo({
                top: messageRef.current!.offsetTop,
                behavior: 'smooth'
            })
        }
        setMessageRef(messageRef)
    }, [])


    const isMe = user.trim().toLowerCase()===name.trim().toLowerCase()
    const messageClass = isMe?s.me:user==='Admin'?s.admin:s.user
    const innerClass = theme==='dark'?s.inner+' '+s.dark:s.inner
    const messageRef = useRef<HTMLDivElement | null>(null);

    const isVisible = useIsVisible(messageRef)
    if (messagesCount===index+1){
        setLastMessageIsVisible(isVisible)
    }

    return (
        <div className={messageClass} ref={messageRef}>
            <div className={innerClass}>
                <div className={s.message}>{message}</div>
                <div className={s.userName}>{user}</div>
            </div>
        </div>
    );
};
