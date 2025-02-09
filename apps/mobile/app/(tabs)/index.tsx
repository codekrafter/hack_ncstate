import { useSession } from "@/lib/auth";
import { useUser } from "@/lib/user";
import { Button, Text, View } from "react-native";

export default function Index() {
  const { signOut } = useSession();
  const user = useUser();

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <View>
        <Button onPress={signOut} title="Logout" />
      </View>
      <Text>Welcome {user?.username}</Text>
    </View>
  );
}
