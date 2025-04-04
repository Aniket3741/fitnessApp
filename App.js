"use client"

import { useState, useEffect } from "react"
import { NavigationContainer } from "@react-navigation/native"
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { createNativeStackNavigator } from "@react-navigation/native-stack"
import { Ionicons } from "@expo/vector-icons"
import { StatusBar } from "expo-status-bar"
import { SafeAreaProvider } from "react-native-safe-area-context"
import * as Notifications from "expo-notifications"
import AsyncStorage from "@react-native-async-storage/async-storage"

// Screens
import HomeScreen from "./screens/HomeScreen"
import ProfileScreen from "./screens/ProfileScreen"
import ClassesScreen from "./screens/ClassesScreen"
import WorkoutScreen from "./screens/WorkoutScreen"
import ProgressScreen from "./screens/ProgressScreen"
import NutritionScreen from "./screens/NutritionScreen"
import GoalsScreen from "./screens/GoalsScreen"
import SupportScreen from "./screens/SupportScreen"
import ClassDetailScreen from "./screens/ClassDetailScreen"
import TrainerProfileScreen from "./screens/TrainerProfileScreen"
import WorkoutDetailScreen from "./screens/WorkoutDetailScreen"
import MealPlanScreen from "./screens/MealPlanScreen"
import LoginScreen from "./screens/LoginScreen"
import RegisterScreen from "./screens/RegisterScreen"

// Context
import { AuthProvider } from "./context/AuthContext"
import { UserDataProvider } from "./context/UserDataContext"

const Tab = createBottomTabNavigator()
const Stack = createNativeStackNavigator()

// Configure notification handler
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: true,
  }),
})

function HomeTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName

          if (route.name === "Home") {
            iconName = focused ? "home" : "home-outline"
          } else if (route.name === "Profile") {
            iconName = focused ? "person" : "person-outline"
          } else if (route.name === "Classes") {
            iconName = focused ? "calendar" : "calendar-outline"
          } else if (route.name === "Workout") {
            iconName = focused ? "fitness" : "fitness-outline"
          } else if (route.name === "Progress") {
            iconName = focused ? "trending-up" : "trending-up-outline"
          } else if (route.name === "Nutrition") {
            iconName = focused ? "restaurant" : "restaurant-outline"
          } else if (route.name === "Goals") {
            iconName = focused ? "trophy" : "trophy-outline"
          } else if (route.name === "Support") {
            iconName = focused ? "chatbubble" : "chatbubble-outline"
          }

          return <Ionicons name={iconName} size={size} color={color} />
        },
        tabBarActiveTintColor: "#4CAF50",
        tabBarInactiveTintColor: "gray",
        headerShown: false,
      })}
    >
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Goals" component={GoalsScreen} />
      <Tab.Screen name="Nutrition" component={NutritionScreen} />
      <Tab.Screen name="Support" component={SupportScreen} />
      <Tab.Screen name="Profile" component={ProfileScreen} />
    </Tab.Navigator>
  )
}

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const userToken = await AsyncStorage.getItem("userToken")
        setIsLoggedIn(userToken !== null)
      } catch (error) {
        console.log("Error checking login status:", error)
      } finally {
        setIsLoading(false)
      }
    }

    const registerForPushNotifications = async () => {
      const { status } = await Notifications.requestPermissionsAsync()
      if (status !== "granted") {
        console.log("Permission not granted for notifications")
        return
      }

      const token = (await Notifications.getExpoPushTokenAsync()).data
      console.log("Push token:", token)
    }

    const scheduleDailyReminder = async () => {
      await Notifications.cancelAllScheduledNotificationsAsync()
      await Notifications.scheduleNotificationAsync({
        content: {
          title: "Hydration Reminder",
          body: "Don't forget to drink water today!",
        },
        trigger: {
          hour: 10,
          minute: 0,
          repeats: true,
        },
      })
    }

    checkLoginStatus()
    registerForPushNotifications()
    scheduleDailyReminder()
  }, [])

  if (isLoading) {
    return null // Or render a loading screen
  }

  return (
    <SafeAreaProvider>
      <AuthProvider>
        <UserDataProvider>
          {/* <NavigationContainer> */}
            <StatusBar style="auto" />
            <Stack.Navigator>
              {!isLoggedIn ? (
                <>
                  <Stack.Screen 
                    name="Login" 
                    component={LoginScreen} 
                    options={{ headerShown: false }} 
                  />
                  <Stack.Screen 
                    name="Register" 
                    component={RegisterScreen} 
                    options={{ headerShown: false }} 
                  />
                </>
              ) : (
                <>
                  <Stack.Screen
                  name="Main"
                  component={HomeTabs}
                  options={{ headerShown: false }}
                />
                <Stack.Screen
                  name="Classes"
                  component={ClassesScreen}
                  options={{ title: "Classes" }}
                />
                <Stack.Screen
                  name="Workout"
                  component={WorkoutScreen}
                  options={{ title: "Workout" }}
                />
                <Stack.Screen
                  name="Progress"
                  component={ProgressScreen}
                  options={{ title: "Progress" }}
                />
                <Stack.Screen
                  name="ClassDetail"
                  component={ClassDetailScreen}
                  options={{ title: "Class Details" }}
                />
                <Stack.Screen
                  name="TrainerProfile"
                  component={TrainerProfileScreen}
                  options={{ title: "Trainer Profile" }}
                />
                <Stack.Screen
                  name="WorkoutDetail"
                  component={WorkoutDetailScreen}
                  options={{ title: "Workout Details" }}
                />
                <Stack.Screen
                  name="MealPlan"
                  component={MealPlanScreen}
                  options={{ title: "Meal Plan" }}
                />
                </>
              )}
            </Stack.Navigator>
          {/* </NavigationContainer> */}
        </UserDataProvider>
      </AuthProvider>
    </SafeAreaProvider>
  )
}