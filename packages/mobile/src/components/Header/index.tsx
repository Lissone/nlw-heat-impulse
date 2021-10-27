import React from 'react'
import {
  View,
  Text,
  TouchableOpacity
} from 'react-native'

import LogoSvg from '../../assets/logo.svg'

import { useAuth } from '../../hooks/useAuth'

import { UserPhoto } from '../UserPhoto'

import { styles } from './styles'

export function Header() {
  const { user, signOut } = useAuth()

  return (
    <View style={styles.container}>
      <LogoSvg />

      <View style={styles.logoutButton}>
        <TouchableOpacity
          onPress={signOut}
        >
          { user &&
            <Text style={styles.logoutText}>
              Sair
            </Text>
          }
        </TouchableOpacity>

        <UserPhoto imageUri={user?.avatarUrl} />
      </View>
    </View>
  )
}