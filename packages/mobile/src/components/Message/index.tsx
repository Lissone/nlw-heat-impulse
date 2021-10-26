import React from 'react'
import {
  Text,
  View
} from 'react-native'
import { MotiView } from 'moti'

import { UserPhoto } from '../UserPhoto'

import { styles } from './styles'

export interface IMessage {
  id: string
  text: string
  user: {
    name: string
    avatarUrl: string
  }
}

interface MessageProps {
  message: IMessage
}

export function Message({ message }: MessageProps) {
  return (
    <MotiView
      from={{ opacity: 0, translateY: -50 }}
      animate={{ opacity: 1, translateY: 0 }}
      transition={{ type: 'timing', duration: 700 }}
      style={styles.container}
    >
      <Text style={styles.message}>
        {message.text}
      </Text>

      <View style={styles.footer}>
        <UserPhoto 
          imageUri={message.user.avatarUrl}
          size="SMALL"
        />

        <Text style={styles.userName}>
        {message.user.name}
        </Text>
      </View>
    </MotiView>
  )
}