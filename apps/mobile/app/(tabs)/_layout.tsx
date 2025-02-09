import { useSession } from "@/lib/auth";
import { Redirect, Tabs } from "expo-router";
import { Text, View } from "react-native";

export default function TabLayout() {
  const { token } = useSession();

  if (!token) {
    return <Redirect href="/login" />;
  }

  return (
    <Tabs screenOptions={{ headerShown: false }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Budget",
          href: "/",
        }}
      />
      <Tabs.Screen
        name="quests"
        options={{
          title: "Quests",
          href: "/quests",
        }}
      />
      <Tabs.Screen
        name="party"
        options={{
          title: "Party",
          href: "/party",
        }}
      />
      <Tabs.Screen
        name="leaderboard"
        options={{
          title: "Leaderboard",
          href: "/leaderboard",
        }}
      />
    </Tabs>
  );
}
