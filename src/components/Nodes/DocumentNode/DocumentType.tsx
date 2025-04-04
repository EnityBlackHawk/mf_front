export type DocType = {
  name: String;
  props: Array<PropType>;
};

export type PropType = {
  name: String;
  type: String;
  isRelationship: boolean;
  isReference: boolean;
};
