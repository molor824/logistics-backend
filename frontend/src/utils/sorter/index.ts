export function localeColumnSorter(field: string) {
  return (a: any, b: any) => String(a[field]).localeCompare(String(b[field]));
}
export function numberColumnSorter(field: string) {
  return (a: any, b: any) => Number(a[field]) - Number(b[field]);
}
