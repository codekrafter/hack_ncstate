import { SessionProvider, useSession } from "@/lib/auth";
import { UserProvider } from "@/lib/user";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { Button } from "react-native";

export default function RootLayout() {
  useFonts({
    "red-alert": require("../assets/fonts/red-alert.ttf"),
  });

  return (
    <SessionProvider>
      <UserProvider>
        <Stack>
          <Stack.Screen
            name="login"
            options={{ title: "Login", headerBackVisible: false }}
          />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
          <Stack.Screen
            name="profile"
            options={{
              headerRight: () => <LogoutButton />,
            }}
          />
        </Stack>
      </UserProvider>
    </SessionProvider>
  );
}

function LogoutButton() {
  const { signOut } = useSession();

  return <Button title="Logout" onPress={signOut} />;
}
