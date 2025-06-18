export interface IColumn<T> {
  name: string;
  label: string;
  value: (value: T) => string;
}
