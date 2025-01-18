import { DarkTheme, DefaultTheme, ThemeProvider } from '@react-navigation/native';
import { Slot, useSegments, useRouter } from 'expo-router';
import { useFonts } from 'expo-font';
import { useEffect } from 'react';
import * as SplashScreen from 'expo-splash-screen';
import { useColorScheme } from '@/hooks/useColorScheme';
import { auth } from '@/src/api/auth';

SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const segments = useSegments();
  const router = useRouter();
  const colorScheme = useColorScheme();

  const [loaded] = useFonts({
    SpaceMono: require('../assets/fonts/SpaceMono-Regular.ttf'),
  });

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const user = await auth.getCurrentUser();
        const isLoginScreen = segments[0] === 'login';
        
        if (!user && !isLoginScreen) {
          router.replace('/login');
        } else if (user && isLoginScreen) {
          router.replace('/(tabs)');
        }
      } catch (error) {
        console.error('Auth check error:', error);
      }
    };

    if (loaded) {
      checkAuth();
      SplashScreen.hideAsync();
    }
  }, [loaded, segments]);

  if (!loaded) {
    return null;
  }

  return (
    <ThemeProvider value={colorScheme === 'dark' ? DarkTheme : DefaultTheme}>
      <Slot />
    </ThemeProvider>
  );
}