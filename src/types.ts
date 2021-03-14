// Belows are for raw data typing
export type MetaAnalysis = {
  total: number;
  zuix: number;
  zuixRatio: number;
};

export type ElementAnalysis = {
  [index: string]: number;
};

export type FileAnalysis = {
  filename: string;
  elementTags: string[];
  zuixElementTags: string[];
  zuixRatio: number;
};

export type ZuixAnalysisReport = {
  element_analysis: ElementAnalysis;
  file_analysis: FileAnalysis[];
  meta: MetaAnalysis;
};

export type ZuixAnalysisResponse = {
  id: number;
  commithash: string;
  createdAt: string;
  contributor: string;
  data: ZuixAnalysisReport;
};

// Belows are for rendering analyzer
export type Component = {
  _parent: null | Directory;
  name: string;
} & FileAnalysis;

export type Directory = {
  _parent: null | Directory;
  sub?: (Directory | Component)[];
  name: string;
} & FileAnalysis;

export type OccurrenceMap = {
  zuix: { [index: string]: number };
  nonzuix: { [index: string]: number };
  total: { [index: string]: number };
};
