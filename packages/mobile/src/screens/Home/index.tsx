import React from 'react'
import { View } from 'react-native'

import { useAuth } from '../../hooks/useAuth'

import { Header } from '../../components/Header'
import { MessageList } from '../../components/MessageList'
import { SendMessageForm } from '../../components/SendMessageForm'
import { SignInBox } from '../../components/SignInBox'

import { styles } from './styles'

export function Home() {
  const { user } = useAuth()

  return (
    <View style={styles.container}>
      <Header />

      <MessageList />

      { user ? <SendMessageForm /> : <SignInBox /> }
    </View>
  )
}