import React, { useEffect, useState } from 'react'
import {
  ScrollView
} from 'react-native'
import io from 'socket.io-client'

import { api } from '../../services/api'

import { Message, IMessage } from '../Message'

import { styles } from './styles'

let messagesQueue: IMessage[] = []

const socket = io(String(api.defaults.baseURL))

socket.on('new_message', newMessage => {
  messagesQueue.push(newMessage)
})

export function MessageList() {
  const [currentMessages, setCurrentMessages] = useState<IMessage[]>([])

  useEffect(() => {
    async function fetchMessages() {
      const messagesResponse = await api.get<IMessage[]>('/messages/last3')

      setCurrentMessages(messagesResponse.data)
    }

    fetchMessages()
  }, [])

  useEffect(() => {
    const timer = setInterval(() => {
      if (messagesQueue.length > 0) {
        setCurrentMessages(prevState => [
          messagesQueue[0],
          prevState[0],
          prevState[1]
        ].filter(Boolean)) // filter undefined value

        messagesQueue.shift() //removes first element from array
      }
    }, 3000)

    return () => clearInterval(timer)
  }, [])

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="never"
    >
      { currentMessages.map(message => 
        <Message
          key={message.id}
          message={message} 
        />
      )}

    </ScrollView>
  )
}