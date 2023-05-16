import mongoose from 'mongoose'
const { Schema } = mongoose

const PageComponentsSchema = new Schema({
  componentKey: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  },
  meta: {
    name: {
      type: String,
      required: true
    },
    content: {
      type: Schema.Types.Mixed
    }
  },
})

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
  path: {
    type: String
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
  pageComponents: {
    type: [PageComponentsSchema],
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

export const UserSchema = new Schema({
  firstName: {
    type: String,
    required: true
  },
  lastName: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    required: true
  },
  id: {
    type: String,
    required: true
  }
})