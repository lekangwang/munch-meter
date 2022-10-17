import {
  StyleSheet,
  View,
  StatusBar,
  SafeAreaView,
  FlatList,
} from "react-native";
import Dial from "./util/Dial";
import { palette } from "./util/Palette";
import { P, H1, H2, H3, H4, H5 } from "./util/Typography";
import Wrapper from "./util/Wrapper";

export default function Home() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden={true} />
      {/* Header */}
      <Wrapper>
        <View>
          <H3>Today's Totals</H3>
          <View>
            <H5>Limits: Cal: 2500 | P: 180 | F: 100 | C: 50</H5>
          </View>
        </View>
        <View style={styles.center}>
          <Dial
            radius={65}
            value={500}
            maxValue={2500}
            label={"Calories (kcal)"}
          />
        </View>
        <View style={{ flexDirection: "row", justifyContent: "center" }}>
          <View style={{ paddingHorizontal: 5 }}>
            <Dial
              radius={55}
              value={100}
              maxValue={180}
              label={"Protein (g)"}
            />
          </View>

          <View style={{ paddingHorizontal: 5 }}>
            <Dial radius={55} value={40} maxValue={100} label={"Fat (g)"} />
          </View>
          <View style={{ paddingHorizontal: 5 }}>
            <Dial radius={55} value={25} maxValue={50} label={"Carbs (g)"} />
          </View>
        </View>
      </Wrapper>
      {/* List of Daily Items */}
      <Wrapper>
        {/* <FlatList 
          data={} // Array of objects
          renderItem={} // Parameter is object containing 1 object
        /> */}
      </Wrapper>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 10,
    paddingTop: 20,
    alignItems: "center",
  },
  center: {
    display: "flex",
    alignItems: "center",
    marginVertical: 10,
  },
});
