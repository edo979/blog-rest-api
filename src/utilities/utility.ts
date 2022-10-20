export function limitTextTo(text: string, numOfChar: number = 60): string {
  return text.substring(0, numOfChar) + '...'
}
