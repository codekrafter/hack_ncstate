import { Button, Text, View } from "react-native";
import type { AppType } from "@repo/backend";
import { hc } from "hono/client";
import { useEffect, useState } from "react";

const client = hc<AppType>("http://10.152.7.144:3000/");

export default function Index() {
  const [data, setData] = useState("");
  const [rand, setRand] = useState(0);

  useEffect(() => {
    console.log("fetching data");
    client.index
      .$get()
      .then((r) => r.text())
      .then((d) => {
        console.log("data: ", d);
        return d;
      })
      .then(setData)
      .catch(console.error);
  }, [rand]);

  return (
    <View
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <Text>Home Page</Text>
      {data.length === 0 ? <Text>Loading...</Text> : <Text>{data}</Text>}
      <Button onPress={() => setRand(Math.random())} title="Refresh" />
    </View>
  );
}
