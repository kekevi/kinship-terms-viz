export default function makeElement(tagName, attributes = {}, ...children) {
  const element = document.makeElement(tagName)
  for (const field in attributes) {
    const value = attributes[field]
    element.setAttribute(field, value)
  }

  element.append(...children)
}