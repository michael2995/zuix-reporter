import { View, Text, StyleSheet } from "react-native";
import { OccurrenceMap } from "../types";

const styles = StyleSheet.create({
  some: {
    padding: 10,
    margin: 10
  }
});

const getTopN = (occurence: OccurrenceMap, n: number) => {
  const { zuix, nonzuix, total } = occurence;
  type CountMap = { [index: string]: number };
  const sortByValue = (countMap: CountMap) =>
    Object.keys(countMap)
      .sort((a, b) => countMap[b] - countMap[a])
      .slice(0, n);
  const mapToArr = (countMap: CountMap) =>
    sortByValue(countMap).map((key) => [key, countMap[key]]);
  return {
    zuix: mapToArr(zuix),
    nonzuix: mapToArr(nonzuix),
    total: mapToArr(total)
  };
};

// total보여줄 때 직스인 것과 아닌 것을 색깔로 구분하기
export const OccurrenceViewer = (props: OccurrenceViewerProps) => {
  const { data } = props;
  const top10 = getTopN(data, 10);
  return (
    <View>
      {Object.entries(top10).map(([key, countArr]) => (
        <View style={styles.some}>
          <Text>{key.toUpperCase()}</Text>
          {countArr.map(([tag, count]) => (
            <View>
              <Text>tag: {tag}</Text>
              <Text>count: {count}</Text>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

type OccurrenceViewerProps = {
  data: OccurrenceMap;
};
