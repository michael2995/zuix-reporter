import React from "react";
import { View } from "react-native";

import { _DATA } from "./_DATA";
import { mapFileStructure } from "./utils";
import { FileAnalysisViewer } from "./components/FileAnalysisViewer";
import { Directory } from "./types";

const rootDirectory = mapFileStructure(_DATA.data.file_analysis);

export default function App() {
  const [root, setRoot] = React.useState<Directory | undefined>(rootDirectory);

  return (
    <View>{root && <FileAnalysisViewer data={root} setRoot={setRoot} />}</View>
  );
}
