/* eslint-disable no-unused-vars */
export interface ImageProps {
  id: number;
  height: string;
  width: string;
  public_id: string;
  format: string;
  blurDataUrl?: string;
  tags?: string[];
}

export interface SharedModalProps {
  index: number;
  images?: ImageProps[];
  currentPhoto?: ImageProps;
  changePhotoId: (newVal: number) => void;
  closeModal: () => void;
  navigation: boolean;
  direction?: number;
  cakeSchema?: Schema;
}

export interface Attribute {
  title: String;
  readOnly: boolean;
  type: String;
  items?: object;
}

export interface Schema {
  title: String;
  properties: object;
  definitions?: object;
  type: String;
  $schema?: String;
}
