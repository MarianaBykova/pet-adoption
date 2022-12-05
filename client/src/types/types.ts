export type TPetType = {
  id: number;
  type?: string;
  age: number;
  sex: string;
  color: string;
  name: string;
  coat: string;
  activity: number;
  friendliness: boolean;
  image: Array<string>;
  description: string;
  createdAt?: string;
  updatedAt?: string
}

export type TPetColor = {
  color: string
}
