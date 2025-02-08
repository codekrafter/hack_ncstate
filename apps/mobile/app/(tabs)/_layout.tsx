import { Redirect, Tabs } from "expo-router";

export default function TabLayout() {
  if (true) {
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
