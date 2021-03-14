import React from "react";
import { View, Text, TouchableOpacity } from "react-native";
import { Component, Directory, OccurrenceMap } from "../types";
import { mapTagCount } from "../utils";
import { OccurrenceViewer } from "./OccurrenceViewer";

const calcOccurence = (data: Component | Directory) => {
  const { elementTags, zuixElementTags } = data;
  const nonZuixArr = elementTags.filter(
    (tag) => !zuixElementTags.includes(tag)
  );
  return {
    zuix: mapTagCount(zuixElementTags),
    nonzuix: mapTagCount(nonZuixArr),
    total: mapTagCount(elementTags)
  };
};

const getSlashAppendedName = (name?: string) => {
  if (!name) return "null";
  return `${name}${name.match(/\.tsx?/) ? "" : "/"}`;
};

// 하위 디렉토리 보여줄 때 직스화정도에 따라 색깔 다르게 표시하기
export const FileAnalysisViewer = (props: FileAnalysisViewerProps) => {
  const { data, setRoot } = props;
  const [occurenceVisible, setOccurenceVisibility] = React.useState(false);
  const [occurrence, setOccurrence] = React.useState<null | OccurrenceMap>(
    null
  );

  React.useEffect(() => {
    setOccurrence(calcOccurence(data));
  }, [data]);

  const onPress = () => {
    setOccurenceVisibility(!occurenceVisible);
  };

  const goToChild = (childName: string) => {
    if (!("sub" in data) || data.sub === undefined)
      return console.log("no subdirectory");
    const nextRoot = data.sub.find((sub) => sub.name === childName);
    if (!nextRoot) return console.log("couldn't find child");
    setRoot(nextRoot);
  };

  const goToParent = () => {
    if (!data._parent) return console.log("reached root");
    setRoot(data._parent);
  };

  const shouldRenderOccurence = occurrence !== null && occurenceVisible;

  return (
    <View>
      <TouchableOpacity onPress={goToParent.bind(null)}>
        <Text>parent: {getSlashAppendedName(data._parent?.name)}</Text>
      </TouchableOpacity>
      <Text>zuixRatio: {data.zuixRatio}</Text>
      <Text>name: {getSlashAppendedName(data.name)}</Text>
      <TouchableOpacity onPress={onPress}>
        <Text>{occurenceVisible ? "HIDE" : "SHOW"} Occurrence</Text>
      </TouchableOpacity>
      {shouldRenderOccurence && (
        <OccurrenceViewer data={occurrence as NonNullable<OccurrenceMap>} />
      )}
      <View>
        {"sub" in data &&
          data.sub &&
          data.sub.map((sub, i) => (
            <TouchableOpacity key={i} onPress={goToChild.bind(null, sub.name)}>
              <Text>name: {getSlashAppendedName(sub.name)}</Text>
            </TouchableOpacity>
          ))}
      </View>
    </View>
  );
};

type FileAnalysisViewerProps = {
  data: Component | Directory;
  setRoot: (newRoot: Component | Directory) => void;
};
