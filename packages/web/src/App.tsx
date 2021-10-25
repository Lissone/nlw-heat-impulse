import { useContext } from 'react'

import { MessageList } from './components/MessageList'
import { SendMessageForm } from './components/SendMessageForm'
import { LoginBox } from './components/LoginBox'

import { AuthContext } from './context/auth'

import styles from './styles/app.module.scss'

export function App() {
  const { user } = useContext(AuthContext)

  return (
    <main className={styles.contentWrapper}>
      <MessageList />

      { !!user ? <SendMessageForm /> : <LoginBox />}
    </main>
  )
}
