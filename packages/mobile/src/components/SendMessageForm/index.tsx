import React, { useState } from 'react'
import {
  TextInput,
  View,
  Alert,
  Keyboard
} from 'react-native'

import { api } from '../../services/api'

import { Button } from '../Button'

import { COLORS } from '../../theme'
import { styles } from './styles'

export function SendMessageForm() {
  const [message, setMessage] = useState('')
  const [sendingMessage, setSendingMessage] = useState(false)

  async function handleSendMessage() {
    const messageFormatted = message.trim()

    if (messageFormatted.length > 0) {
      setSendingMessage(true)

      await api.post('/messages', { message: messageFormatted })

      setMessage('')
      Keyboard.dismiss()
    } else {
      Alert.alert('Escreva a mensagem para enviar')
    }
    
    setSendingMessage(false)
  }

  return (
    <View style={styles.container}>
      <TextInput 
        keyboardAppearance="dark"
        placeholder="Qual sua expectativa para o evento"
        placeholderTextColor={COLORS.GRAY_PRIMARY}
        maxLength={140}
        multiline
        value={message}
        onChangeText={setMessage}
        style={styles.input}
        editable={!sendingMessage}
      />

      <Button 
        title="ENVIAR MENSAGEM"
        color={COLORS.WHITE}
        backgroundColor={COLORS.PINK}
        isLoading={sendingMessage}
        onPress={handleSendMessage}
      />
    </View>
  )
}