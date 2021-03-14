export const mapTagCount = <T extends string>(
  tags: T[]
): { [K in T]: number } => {
  type TagCountMap = { [K in T]: number };

  const result: Partial<TagCountMap> = {};
  tags.forEach((tag) => {
    if (result[tag] === undefined) {
      result[tag] = 1;
    } else {
      (result[tag] as number) += 1;
    }
  });

  return result as TagCountMap;
};
