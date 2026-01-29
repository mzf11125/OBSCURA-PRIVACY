// Fallback for using MaterialIcons on Android and web.
import MaterialIcons from '@expo/vector-icons/MaterialIcons'
import { SymbolViewProps } from 'expo-symbols'
import { ComponentProps } from 'react'
import { OpaqueColorValue, type StyleProp, type TextStyle } from 'react-native'

type UiIconMapping = Record<SymbolViewProps['name'], ComponentProps<typeof MaterialIcons>['name']>
export type UiIconSymbolName = keyof typeof MAPPING

/**
 * Add your SF Symbols to Material Icons mappings here.
 * - see Material Icons in the [Icons Directory](https://icons.expo.fyi).
 * - see SF Symbols in the [SF Symbols](https://developer.apple.com/sf-symbols/) app.
 */
const MAPPING = {
  // Existing icons
  'gearshape.fill': 'settings',
  'wallet.pass.fill': 'wallet',
  'ladybug.fill': 'bug-report',

  // Tab icons - Home
  'house.fill': 'home',
  'house': 'home',

  // Tab icons - OTC
  'chart.line.fill': 'show-chart',
  'chart.line.uptrend.xyaxis': 'trending-up',
  'arrow.swap': 'swap-horiz',

  // Tab icons - Activity
  'clock.fill': 'history',
  'clock': 'history',
  'list.bullet': 'list',
  'clock.arrow.circlepath': 'update',

  // Tab icons - Profile
  'person.fill': 'person',
  'person': 'person',
  'person.crop.circle': 'account-circle',

  // Action icons
  'arrow.right': 'arrow-forward',
  'arrow.left': 'arrow-back',
  'chevron.right': 'chevron-right',
  'chevron.down': 'expand-more',
  'plus.circle.fill': 'add-circle',
  'checkmark.circle.fill': 'check-circle',
  'xmark.circle.fill': 'cancel',
  'exclamationmark.triangle.fill': 'warning',

  // Privacy icons
  'eye.fill': 'visibility',
  'eye.slash.fill': 'visibility-off',
  'lock.fill': 'lock',
  'lock.open.fill': 'lock-open',
  'shield.fill': 'verified-user',
  'shield.lefthalf.filled': 'security',

  // OTC icons
  'arrow.up.right': 'trending-up',
  'arrow.down.right': 'trending-down',
  'arrow.left.arrow.right': 'swap-horiz',
  'repeat': 'repeat',

  // Wallet icons
  'creditcard.fill': 'credit-card',
  'banknote.fill': 'attach-money',

  // Status icons
  'checkmark': 'check',
  'xmark': 'close',
  'ellipsis': 'more-horiz',
  'info.circle.fill': 'info',
} as UiIconMapping

/**
 * An icon component that uses native SF Symbols on iOS, and Material Icons on Android and web.
 * This ensures a consistent look across platforms, and optimal resource usage.
 * Icon `name`s are based on SF Symbols and require manual mapping to Material Icons.
 */
export function UiIconSymbol({
  name,
  size = 24,
  color,
  style,
}: {
  name: UiIconSymbolName
  size?: number
  color: string | OpaqueColorValue
  style?: StyleProp<TextStyle>
}) {
  return <MaterialIcons color={color} size={size} name={MAPPING[name]} style={style} />
}
