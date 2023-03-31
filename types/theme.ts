interface ThemeFieldModel {
  title?: Text,
  text?: Text,
  list?: List,
  link?: Link,
  image?: Image
}

interface Text {
  type: string,
  default?: string,
  value?: string
}

interface List {
  type: string,
  default?: Text[],
  value?: Text[]
}

interface Link {
  type: string,
  default?: {
    label: string,
    link: string
  },
  value?: {
    label: string,
    link: string
  }
}

interface Image {
  type: string,
  default?: string,
  value?: string
}

export {
  ThemeFieldModel
}