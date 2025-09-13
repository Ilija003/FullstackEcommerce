import '@/global.css';
import { Link, Stack } from 'expo-router';
import { GluestackUIProvider } from '@/components/ui/gluestack-ui-provider';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Icon } from '@/components/ui/icon';
import { Text } from '@/components/ui/text';
import { ShoppingCart, User, LogOut } from 'lucide-react-native';
import { Pressable } from 'react-native';
import { useCart } from '@/store/cartStore';
import { useAuth } from '@/store/authStore';
import CustomStripeProvider from '@/components/CustomStripeProvider';

const queryClient = new QueryClient();


export default function RootLayout() {
  const cartItemsNum = useCart((state) => state.items.length);
  const isLoggedIn = useAuth((s) => !!s.token);
  const clearAuth = useAuth((s) => s.clearAuth);
  
  // const { data: stripeKeys } = useQuery({
  //   queryKey: ['stripe', 'keys'],
  //   queryFn: fetchStripeKeys,
  // });

  // console.log(stripeKeys);
 
  
  return (
    <QueryClientProvider client={queryClient}>
      <CustomStripeProvider>
        <GluestackUIProvider>
          <Stack
            screenOptions={{
              headerRight: () =>
                cartItemsNum > 0 && (
                  <Link href={'/cart'} asChild>
                    <Pressable className="flex-row gap-2">
                      <Icon as={ShoppingCart} />
                      <Text>{cartItemsNum}</Text>
                    </Pressable>
                  </Link>
                ),
              headerLeft: () =>
                isLoggedIn ? (
                  <Pressable className="flex-row gap-2" onPress={clearAuth}>
                    <Icon as={LogOut} />
                  </Pressable>
                ) : (
                  <Link href={'/login'} asChild>
                    <Pressable className="flex-row gap-2">
                      <Icon as={User} />
                    </Pressable>
                  </Link>
                ),
            }}
          >
            <Stack.Screen name="index" options={{ title: 'Shop' }} />
            <Stack.Screen name="product/[id]" options={{ title: 'Product' }} />
          </Stack>
        </GluestackUIProvider>
      </CustomStripeProvider>
    </QueryClientProvider>
  );
}