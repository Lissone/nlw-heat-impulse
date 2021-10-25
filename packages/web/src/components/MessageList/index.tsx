import { useEffect, useState } from 'react'
import io from 'socket.io-client'

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

const messagesQueue: IMessage[] = []

const socket = io(import.meta.env.VITE_BASE_URL_API || 'http://localhost:5000')

socket.on('new_message', (newMessage: IMessage) => {
  messagesQueue.push(newMessage)
})

export function MessageList() {
  const [messages, setMessages] = useState<IMessage[]>([])

  useEffect(() => {
    api.get<IMessage[]>('/messages/last3').then(response => {
      setMessages(response.data)
    })
  }, [])

  useEffect(() => {
    setInterval(() => {
      if (messagesQueue.length > 0) {
        setMessages(prevState => [
          messagesQueue[0],
          prevState[0],
          prevState[1]
        ].filter(Boolean)) // filter undefined value

        messagesQueue.shift() //removes first element from array
      }
    }, 3000)
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