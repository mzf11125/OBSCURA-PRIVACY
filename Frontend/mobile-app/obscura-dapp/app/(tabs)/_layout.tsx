import { Tabs } from 'expo-router'
import React from 'react'
import { UiIconSymbol } from '@/components/ui/ui-icon-symbol'

export default function TabLayout() {
  return (
    <Tabs screenOptions={{ headerShown: false }}>
      {/* The index redirects to the home screen */}
      <Tabs.Screen
        name="index"
        options={{ tabBarItemStyle: { display: 'none' }, href: null }}
      />
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color }) => <UiIconSymbol size={28} name="house.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="otc"
        options={{
          title: 'OTC',
          tabBarIcon: ({ color }) => <UiIconSymbol size={28} name="chart.line.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="activity"
        options={{
          title: 'Activity',
          tabBarIcon: ({ color }) => <UiIconSymbol size={28} name="clock.fill" color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: 'Profile',
          tabBarIcon: ({ color }) => <UiIconSymbol size={28} name="person.fill" color={color} />,
        }}
      />
    </Tabs>
  )
}
