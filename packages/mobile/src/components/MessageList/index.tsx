import React from 'react'
import {
  ScrollView
} from 'react-native'

import { Message } from '../Message'

import { styles } from './styles'

export function MessageList() {
  const message = {
    id: '1',
    text: 'Muito legal isso daqui tudo!',
    user: {
      name: 'Leonardo Dias',
      avatarUrl: 'https://github.com/Lissone.png'
    }
  }

  return (
    <ScrollView 
      style={styles.container}
      contentContainerStyle={styles.content}
      keyboardShouldPersistTaps="never"
    >
      <Message message={message} />
      <Message message={message} />
      <Message message={message} />
    </ScrollView>
  )
}