import {BaseModel} from "./base.mjs";

export class Article extends BaseModel {
  id
  heading
  content
  created_at
  updated_at

  constructor(properties) {
    super();
    properties.id && (this.id = properties.id)
    properties.heading && (this.heading = properties.heading)
    properties.content && (this.content = properties.content)
    properties.created_at && (this.created_at = properties.created_at)
    properties.updated_at && (this.updated_at = properties.updated_at)
  }
}