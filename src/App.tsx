// アプリ全体の構成をまとめる
import { useState } from "react";
import { type Todo } from "./types/todo";
import TodoInput from "./components/TodoInput";
import TodoList from "./components/TodoList";

function App() {
	const [todos, setTodos] = useState<Todo[]>([]);

	// Create
	const addTodo = (text: string) => {
		const newTodo: Todo = {
			id: Date.now(),
			text,
			completed: false,
		};
		setTodos([...todos, newTodo]);
	};

	// Update (toggle)
	const toggleTodo = (id: number) => {
		setTodos(
			todos.map((todo) =>
				todo.id === id ? { ...todo, completed: !todo.completed } : todo
			)
		);
	};

	// Delete
	const deleteTodo = (id: number) => {
		setTodos(todos.filter((todo) => todo.id !== id));
	};

	// Update (edit)
	const editTodo = (id: number, newText: string) => {
		setTodos(
			todos.map((todo) => (todo.id === id ? { ...todo, text: newText } : todo))
		);
	};

	return (
		<div
			style={{
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				height: "100vh",
				fontFamily: "sans-serif",
				background: "#f5f5f5",
			}}
		>
			<div
				style={{
					maxWidth: 400,
					width: "100%",
					background: "white",
					padding: "1.5rem",
					borderRadius: "8px",
					boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
					textAlign: "center",
				}}
			>
				<h1 style={{ marginBottom: "1rem" }}>Todo App (CRUD)</h1>

				{/* 入力フォーム */}
				<TodoInput onAdd={addTodo} />

				{/* タスクリスト */}
				<TodoList
					todos={todos}
					onToggle={toggleTodo}
					onDelete={deleteTodo}
					onEdit={editTodo}
				/>
			</div>
		</div>
	);
}

export default App;
