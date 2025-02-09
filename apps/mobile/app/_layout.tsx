import { SessionProvider } from "@/lib/auth";
import { UserProvider } from "@/lib/user";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";

export default function RootLayout() {
  useFonts({
    "red-alert": require("../assets/fonts/red-alert.ttf"),
  });

  return (
    <SessionProvider>
      <UserProvider>
        <Stack>
          <Stack.Screen name="login" options={{ title: "Login" }} />
          <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        </Stack>
      </UserProvider>
    </SessionProvider>
  );
}
