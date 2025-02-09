import { useSession } from "@/lib/auth";
import { Redirect, Tabs } from "expo-router";
import { Image, ImageBackground, Text, View } from "react-native";
import { SafeAreaProvider } from "react-native-safe-area-context";

export default function TabLayout() {
  const { token } = useSession();

  if (!token) {
    return <Redirect href="/login" />;
  }

  return (
    <SafeAreaProvider>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarInactiveTintColor: "white",
          tabBarActiveTintColor: "#3D9970",
          tabBarStyle: {
            borderTopWidth: 0,
            boxShadow: "0 -3px 5px rgba(0, 0, 0, 0.5)",
          },
          tabBarBackground: () => (
            <ImageBackground
              source={require("../../assets/images/wood-plank.jpg")}
              style={{
                width: "100%",
                height: "100%",
              }}
            >
              <View
                style={{
                  flex: 1,
                  backgroundColor: "rgba(0,0,0,0.3)",
                }}
              />
            </ImageBackground>
          ),
        }}
      >
        <Tabs.Screen
          name="index"
          options={{
            title: "Budget",
            href: "/",
            tabBarIcon: () => (
              <Image
                source={require("../../assets/images/coinIcon.png")}
                style={{
                  width: 20,
                  height: 20,
                  resizeMode: "contain",
                }}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="quests"
          options={{
            title: "Quests",
            href: "/quests",
            tabBarIcon: () => (
              <Image
                source={require("../../assets/images/bookIcon.png")}
                style={{
                  width: 20,
                  height: 20,
                  resizeMode: "contain",
                }}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="party"
          options={{
            title: "Party",
            href: "/party",
            tabBarIcon: () => (
              <Image
                source={require("../../assets/images/hatIcon.png")}
                style={{
                  width: 20,
                  height: 20,
                  resizeMode: "contain",
                }}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="leaderboard"
          options={{
            title: "Leaderboard",
            href: "/leaderboard",
            tabBarIcon: () => (
              <Image
                source={require("../../assets/images/ringIcon.png")}
                style={{
                  width: 20,
                  height: 20,
                  resizeMode: "contain",
                }}
              />
            ),
          }}
        />
      </Tabs>
    </SafeAreaProvider>
  );
}
