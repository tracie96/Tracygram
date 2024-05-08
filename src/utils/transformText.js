export default function transformText(text, mode = 'first') {
  switch (mode) {
    case 'capitalize':
      return text
        ?.split(' ')
        ?.map((word) => word?.charAt(0)?.toUpperCase() + word?.slice(1)?.toLowerCase())
        ?.join(' ');
    case 'uppercase':
      return text?.toUpperCase();
    case 'lowercase':
      return text?.toLowerCase();
    case 'first':
    default:
      return text?.charAt(0)?.toUpperCase() + text?.slice(1)?.toLowerCase();
  }
}
