// タスク一覧を表示するコンポーネント
import { type Todo } from "../types/todo";
import TodoItem from "./TodoItem";

type Props = {
	todos: Todo[];
	onToggle: (id: number) => void;
	onDelete: (id: number) => void;
	onEdit: (id: number, newText: string) => void;
};

const TodoList = ({ todos, onToggle, onDelete, onEdit }: Props) => {
	return (
		<ul style={{ marginTop: "1rem", textAlign: "left", padding: 0 }}>
			{todos.map((todo) => (
				<TodoItem
					key={todo.id}
					todo={todo}
					onToggle={onToggle}
					onDelete={onDelete}
					onEdit={onEdit}
				/>
			))}
		</ul>
	);
};

export default TodoList;
