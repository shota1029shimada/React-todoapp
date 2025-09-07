// Todo型を定義
// Todoの型を定義
// どのファイルでも同じ型を使えるように共通化している
export type Todo = {
    id: number;
    text: string;
    completed: boolean;
  };