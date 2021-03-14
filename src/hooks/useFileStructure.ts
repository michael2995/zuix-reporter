import React from "react";
import { Directory } from "../types";

type FileStructureHookParams = {
  initializeWith?: Directory;
};

export const useFileStrucrue = (params?: FileStructureHookParams) => {
  const { initializeWith } = params || {};
  const [focalPoint, setFocalPoint] = React.useState<Directory | undefined>(
    initializeWith
  );

  const goToChild = (subName: string) => {
    if (!focalPoint) return console.log("blank structure");
    if (!("sub" in focalPoint) || !focalPoint.sub)
      return console.log("doesn't have subdirectory");

    const child = focalPoint.sub.find((sub) => sub.name === subName);
    setFocalPoint(child);
  };

  const goToParent = () => {
    if (!focalPoint) return console.log("blank structure");
    if (focalPoint._parent === null) return console.log("reached root");
    setFocalPoint(focalPoint._parent);
  };

  return { focalPoint, goToParent, goToChild };
};
