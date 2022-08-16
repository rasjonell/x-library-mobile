function truncate(thing: string, until: number): string;
function truncate(thing: Array<string>, until: number): string;

function truncate(thing: string | Array<string>, until: number): string {
  const toBeTruncated = Array.isArray(thing) ? thing.join(', ') : thing;
  const originalLength = Array.isArray(thing)
    ? thing.join(', ').length
    : thing.length;

  const truncated = toBeTruncated.substring(0, until).trimEnd();

  return `${truncated}${originalLength > until ? '...' : '.'}`;
}

export default truncate;
