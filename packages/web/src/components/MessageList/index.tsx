import { useEffect, useState } from 'react'

import logoImg from '../../assets/logo.svg'

import { api } from '../../services/api'

import styles from './styles.module.scss'

interface IMessage {
  id: string
  text: string
  user: {
    name: string
    avatarUrl: string
  }
}

export function MessageList() {
  const [messages, setMessages] = useState<IMessage[]>([])

  useEffect(() => {
    api.get<IMessage[]>('/messages/last3').then(response => {
      setMessages(response.data)
    })
  }, [])

  return (
    <div className={styles.messageListWrapper}>
      <img src={logoImg} alt='DoWhile 2021' />

      <ul className={styles.messageList}>
        {messages.map(message => (
          <li key={message.id} className={styles.message}>
            <p className={styles.messageContent}>{message.text}</p>
  
            <div className={styles.messageUser}>
              <div className={styles.userImage}>
                <img src={message.user.avatarUrl} alt={message.user.name}/>
              </div>
  
              <span>{message.user.name}</span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}