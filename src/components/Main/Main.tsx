import React, {useState} from 'react';
import s from './Main.module.css'
import {Link} from "react-router-dom";
import {ThemeType} from "../../App";

type MainPropsType = {
    theme: ThemeType
}

type valuesType = {
    name: string
    room: string
}

export const Main = (props: MainPropsType) => {

    const [values, setValues] = useState<valuesType>({name: '', room: ''})

    const changeHandler = (key: string, value: string) => {
        setValues({...values, [key]: value})
    }
    const linkClickHandler = (e: React.MouseEvent<HTMLElement>) => {
        const isDisabled = Object.values(values).some(values => !!values)
        if (!isDisabled) e.preventDefault()
    }

    const wrapperClass = props.theme==='dark'?s.wrapper+' '+s.dark:s.wrapper

    return (
        <div className={wrapperClass}>
            <form className={s.form}>
                <input className={s.input}
                       type="text"
                       name={'name'}
                       value={values.name}
                       placeholder={'User Name'}
                       onChange={(e) => changeHandler('name', e.currentTarget.value)}
                       autoComplete={'off'}
                       required/>
                <input className={s.input}
                       type="text"
                       name={'room'}
                       value={values.room}
                       placeholder={'Room'}
                       onChange={(e) => changeHandler('room', e.currentTarget.value)}
                       autoComplete={'off'}
                       required/>

                <Link to={`/chat?name=${values.name}&room=${values.room}`}
                      onClick={linkClickHandler}>
                    <button className={s.btn} type={'submit'}>
                        Sign in
                    </button>
                </Link>
            </form>
        </div>
    );
};

