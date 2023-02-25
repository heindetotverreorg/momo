import mongoose from 'mongoose'
const { Schema } = mongoose

export const PageSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  slug: {
    type: String,
    required: true,
  },
  isInMenu: {
    type: Boolean
  },
  parent: {
    type: Array
  },
  menuOrder: {
    type: Number,
    required: true
  },
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  keywords: {
    type: String,
    required: true
  },
  contentComponents: {
    type: Array,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  author: {
    type: String,
    required: true
  }
})