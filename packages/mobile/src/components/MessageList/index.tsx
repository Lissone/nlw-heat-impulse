import React, { useEffect, useState } from 'react'
import {
  ScrollView
} from 'react-native'

import { api } from '../../services/api'

import { Message, IMessage } from '../Message'

import { styles } from './styles'

export function MessageList() {
  const [currentMessages, setCurrentMessages] = useState<IMessage[]>([])

  useEffect(() => {
    async function fetchMessages() {
      const messagesResponse = await api.get<IMessage[]>('/messages/last3')

      setCurrentMessages(messagesResponse.data)
    }

    fetchMessages()
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