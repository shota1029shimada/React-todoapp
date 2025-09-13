// タスク一覧を表示するコンポーネント
import { type Todo } from "../types/todo"; //Todo 型をインポート（id, text, completed などを持つ型）
import TodoItem from "./TodoItem"; //TodoItem コンポーネントをインポート

type Props = {
	// コンポーネントのpropsの型を定義
	todos: Todo[]; // Todo 型の配列
	onToggle: (id: number) => void; // 完了状態の切り替えを親(App)に依頼する関数
	onDelete: (id: number) => void; // 削除を親(App)に依頼する関数
	onEdit: (id: number, newText: string) => void; // 編集を親(App)に依頼する関数
};

const TodoList = ({ todos, onToggle, onDelete, onEdit }: Props) => {
	// コンポーネントのpropsを受け取る
	return (
		//タスクリストを中央に表示
		<ul
			style={{
				marginTop: "1rem",
				textAlign: "center",
				padding: 0,
				listStyle: "none",
				width: "100%",
			}}
		>
			{todos.map(
				(
					todo //Todo 型の配列の要素をtodoに設定
				) => (
					<TodoItem //TodoItem コンポーネントを表示
						key={todo.id} //Todo 型の配列の要素のidをkeyに設定
						todo={todo} //Todo 型の配列の要素をtodoに設定
						onToggle={onToggle} // 完了状態の切り替えを親(App)に依頼する関数
						onDelete={onDelete} // 削除を親(App)に依頼する関数
						onEdit={onEdit} // 編集を親(App)に依頼する関数
					/>
				)
			)}
		</ul>
	);
};

export default TodoList; //TodoList コンポーネントをエクスポート
