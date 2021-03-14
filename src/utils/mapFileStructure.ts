import { FileAnalysis, Directory, Component } from "../types";

const makeDirectory = (name: string, meta?: FileAnalysis): Directory => ({
  name,
  zuixRatio: 0,
  elementTags: [],
  zuixElementTags: [],
  filename: meta?.filename || "/",
  _parent: null
});

const makeComponent = (name: string, meta: FileAnalysis): Component => ({
  name,
  ...meta,
  _parent: null
});

const prepareSubdirectory = (target: Directory): Required<Directory> => {
  if (target.sub) {
    return target as Required<Directory>;
  } else {
    target.sub = [];
    return target as Required<Directory>;
  }
};

const isDirectory = (target: any): target is Directory => {
  return typeof target === "object" && "name" in target;
};

const existingDirectoryOf = (child: string, parent: Directory) => {
  const prepared = prepareSubdirectory(parent);
  const existing = prepared.sub.find(
    (sub) => isDirectory(sub) && sub.name === child
  ) as Directory | undefined;
  return existing;
};

const pushToDirectory = (
  child: string,
  parent: Directory,
  meta: FileAnalysis
) => {
  const prepared = prepareSubdirectory(parent);
  const existing = existingDirectoryOf(child, parent);

  // child is file
  if (child.match(/\.tsx?/g)) {
    const component = makeComponent(child, meta);
    prepared.sub.push(component);
    component._parent = prepared;
    return prepared;
    // child is directory
  } else if (existing) {
    return existing;
  } else {
    const subdirectory = makeDirectory(child, meta);
    subdirectory._parent = prepared;
    prepared.sub.push(subdirectory);
    return subdirectory;
  }
};

const sumupFileStructure = (root: Directory) => {
  let linedUp: (Directory | Component)[] = [];

  let lineupWorkload = [root];
  while (lineupWorkload.length) {
    const target = lineupWorkload.shift() as Directory;
    target.sub?.forEach((sub) => lineupWorkload.push(sub));
    linedUp.unshift(target);
  }

  linedUp.forEach((item) => {
    item._parent?.elementTags.push(...item.elementTags);
    item._parent?.zuixElementTags.push(...item.zuixElementTags);
    if ("sub" in item) {
      const zuix = item.zuixElementTags.length;
      const total = item.elementTags.length;
      item.zuixRatio = zuix / total;
    }
  });

  return root;
};

export const mapFileStructure = (fileAnalyses: FileAnalysis[]) => {
  const root = makeDirectory("packages");

  fileAnalyses.forEach((analysis) => {
    const { filename } = analysis;

    let parent = root;

    filename
      .split("/")
      .slice(1)
      .forEach((name) => {
        const nextParent = pushToDirectory(name, parent, analysis);
        if (nextParent) parent = nextParent;
      });
  });

  sumupFileStructure(root);
  return root;
};
