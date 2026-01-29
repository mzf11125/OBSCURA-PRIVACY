import { router } from 'expo-router'
import { useAuth } from '@/components/auth/auth-provider'
import { GradientBackground } from '@/components/ui/gradient-background'
import { PrimaryButton } from '@/components/ui/primary-button'
import { AppText } from '@/components/app-text'
import { AppConfig } from '@/constants/app-config'
import { SafeAreaView } from 'react-native-safe-area-context'
import { StyleSheet, View } from 'react-native'
import { Image } from 'expo-image'
import { useThemeColor } from '@/hooks/use-theme-color'

export default function SignIn() {
  const { signIn } = useAuth()
  const primaryLight = useThemeColor({}, 'primaryLight')

  const handleConnect = async () => {
    await signIn()
    router.replace('/wallet-selection')
  }

  return (
    <GradientBackground>
      <SafeAreaView style={styles.container}>
        <View style={styles.content}>
          {/* Logo with Obscura branding */}
          <View style={styles.logoContainer}>
            <Image
              source={require('../assets/images/icon.png')}
              style={styles.logo}
            />
          </View>

          {/* App name and tagline */}
          <View style={styles.textContainer}>
            <AppText type="title" style={styles.title}>
              {AppConfig.name}
            </AppText>
            <AppText style={styles.tagline}>
              Your Private Gateway to Web3
            </AppText>
          </View>

          {/* Privacy badges */}
          <View style={styles.badgesContainer}>
            <View style={[styles.badge, { backgroundColor: `${primaryLight}20` }]}>
              <AppText style={[styles.badgeText, { color: primaryLight }]}>
                🔒 Privacy First
              </AppText>
            </View>
            <View style={[styles.badge, { backgroundColor: `${primaryLight}20` }]}>
              <AppText style={[styles.badgeText, { color: primaryLight }]}>
                🛡️ Shielded Transactions
              </AppText>
            </View>
          </View>
        </View>

        {/* Connect button */}
        <View style={styles.buttonContainer}>
          <PrimaryButton
            title="Connect Wallet"
            onPress={handleConnect}
            variant="border"
            size="large"
            style={styles.connectButton}
          />
        </View>
      </SafeAreaView>
    </GradientBackground>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logoContainer: {
    marginBottom: 24,
  },
  logo: {
    width: 140,
    height: 140,
  },
  textContainer: {
    alignItems: 'center',
    marginBottom: 32,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#FFFFFF',
    marginBottom: 12,
  },
  tagline: {
    fontSize: 16,
    color: 'rgba(255, 255, 255, 0.7)',
    textAlign: 'center',
  },
  badgesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'center',
    gap: 12,
  },
  badge: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
  },
  badgeText: {
    fontSize: 13,
    fontWeight: '600',
  },
  buttonContainer: {
    marginBottom: 24,
  },
  connectButton: {
    paddingVertical: 16,
  },
})

