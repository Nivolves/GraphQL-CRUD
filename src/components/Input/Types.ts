export interface IInputProps {
  changeValue: (value: string) => void
  value: string
  handleSubmit: (value: React.FormEvent<HTMLFormElement>) => void
}
