// アプリ全体の構成をまとめる
import { useState } from "react"; //React の useState フックをインポート
import { type Todo } from "./types/todo"; //Todo 型をインポート（id, text, completed などを持つ型）
import TodoInput from "./components/TodoInput"; //TodoInput コンポーネントをインポート
import TodoList from "./components/TodoList"; //TodoList コンポーネントをインポート

//App コンポーネント
function App() {
	const [todos, setTodos] = useState<Todo[]>([]); //Todo 型の配列を管理するstate
	const [errorMessage, setErrorMessage] = useState<string>(""); //エラーメッセージを管理するstate

	// Create
	const addTodo = (text: string) => {
		// エラーメッセージをクリア
		setErrorMessage("");

		// 重複チェック（大文字小文字を区別しない）
		const trimmedText = text.trim();
		const isDuplicate = todos.some(
			(todo) => todo.text.toLowerCase() === trimmedText.toLowerCase()
		);

		if (isDuplicate) {
			setErrorMessage("このタスクは既に存在します。");
			return;
		}

		const newTodo: Todo = {
			id: Date.now(),
			text: trimmedText,
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

	// Bulk delete completed todos
	const deleteCompletedTodos = () => {
		setTodos(todos.filter((todo) => !todo.completed));
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
				textAlign: "center",
				width: "100vw",
				margin: "0",
				padding: "0",
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
					display: "flex",
					flexDirection: "column",
					alignItems: "center",
				}}
			>
				<h1 style={{ marginBottom: "1rem" }}>Todo App (CRUD)</h1>

				{/* 入力フォーム */}
				<TodoInput
					onAdd={addTodo}
					onDeleteCompleted={deleteCompletedTodos}
					hasCompletedTodos={todos.some((todo) => todo.completed)}
					errorMessage={errorMessage}
				/>

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
