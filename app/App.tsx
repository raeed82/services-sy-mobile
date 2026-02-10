import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { ActivityIndicator, View } from 'react-native';

import { useAuth } from '../src/hooks/useAuth';
import apiClient from '../src/api/client';

// Screens
import LoginScreen from '../src/screens/LoginScreen';
import RegisterScreen from '../src/screens/RegisterScreen';
import HomeScreen from '../src/screens/HomeScreen';
import SearchScreen from '../src/screens/SearchScreen';
import ProfileScreen from '../src/screens/ProfileScreen';
import ServiceDetailsScreen from '../src/screens/ServiceDetailsScreen';
import MyServicesScreen from '../src/screens/MyServicesScreen';
import CreateServiceScreen from '../src/screens/CreateServiceScreen';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

// Auth Stack
function AuthStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
        animationEnabled: true,
      }}
    >
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen name="Register" component={RegisterScreen} />
    </Stack.Navigator>
  );
}

// Home Stack
function HomeStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen 
        name="HomeScreen" 
        component={HomeScreen}
        options={{ title: 'الرئيسية' }}
      />
      <Stack.Screen 
        name="ServiceDetails" 
        component={ServiceDetailsScreen}
        options={{ title: 'تفاصيل الخدمة' }}
      />
    </Stack.Navigator>
  );
}

// Search Stack
function SearchStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen 
        name="SearchScreen" 
        component={SearchScreen}
        options={{ title: 'البحث' }}
      />
      <Stack.Screen 
        name="ServiceDetails" 
        component={ServiceDetailsScreen}
        options={{ title: 'تفاصيل الخدمة' }}
      />
    </Stack.Navigator>
  );
}

// Services Stack
function ServicesStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen 
        name="MyServices" 
        component={MyServicesScreen}
        options={{ title: 'خدماتي' }}
      />
      <Stack.Screen 
        name="CreateService" 
        component={CreateServiceScreen}
        options={{ title: 'إنشاء خدمة جديدة' }}
      />
      <Stack.Screen 
        name="ServiceDetails" 
        component={ServiceDetailsScreen}
        options={{ title: 'تفاصيل الخدمة' }}
      />
    </Stack.Navigator>
  );
}

// Profile Stack
function ProfileStack() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: true,
        headerTitleAlign: 'center',
      }}
    >
      <Stack.Screen 
        name="ProfileScreen" 
        component={ProfileScreen}
        options={{ title: 'الملف الشخصي' }}
      />
    </Stack.Navigator>
  );
}

// App Tabs (للمستخدمين المسجلين)
function AppTabs() {
  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: '#667eea',
        tabBarInactiveTintColor: '#999',
      }}
    >
      <Tab.Screen 
        name="Home" 
        component={HomeStack}
        options={{
          title: 'الرئيسية',
          tabBarLabel: 'الرئيسية',
        }}
      />
      <Tab.Screen 
        name="Search" 
        component={SearchStack}
        options={{
          title: 'البحث',
          tabBarLabel: 'البحث',
        }}
      />
      <Tab.Screen 
        name="Services" 
        component={ServicesStack}
        options={{
          title: 'خدماتي',
          tabBarLabel: 'خدماتي',
        }}
      />
      <Tab.Screen 
        name="Profile" 
        component={ProfileStack}
        options={{
          title: 'الملف الشخصي',
          tabBarLabel: 'الملف',
        }}
      />
    </Tab.Navigator>
  );
}

// Main App Component
export default function App() {
  const { user, isLoading, checkAuth, isAuthenticated } = useAuth();
  const [appReady, setAppReady] = React.useState(false);

  useEffect(() => {
    // التحقق من المصادقة عند تحميل التطبيق
    const initializeApp = async () => {
      try {
        console.log('🔍 جاري التحقق من المصادقة...');
        const status = apiClient.getConnectionStatus();
        console.log('📡 حالة الاتصال:', status);
        
        await checkAuth();
      } catch (error) {
        console.error('خطأ في تهيئة التطبيق:', error);
      } finally {
        setAppReady(true);
      }
    };

    initializeApp();
  }, [checkAuth]);

  if (!appReady || isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size="large" color="#667eea" />
      </View>
    );
  }

  return (
    <NavigationContainer>
      {isAuthenticated ? <AppTabs /> : <AuthStack />}
    </NavigationContainer>
  );
}
