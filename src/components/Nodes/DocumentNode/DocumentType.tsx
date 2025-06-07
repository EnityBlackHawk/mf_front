export type DocType = {
  id: number;
  name: String;
  props: Array<PropType>;
};

export type PropType = {
  name: String;
  type: String;
  isRelationship: boolean;
  isReference: boolean;
};
