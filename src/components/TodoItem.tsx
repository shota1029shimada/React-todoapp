// 1つのタスクを表示・編集・削除するコンポーネント
import { useState } from "react";
import { type Todo } from "../types/todo";
// Todo 型をインポート（id, text, completed などを持つ型）

type Props = {
	todo: Todo; // 表示する1つのタスク
	onToggle: (id: number) => void; // 完了状態の切り替えを親(App)に依頼する関数
	onDelete: (id: number) => void; // 削除を親(App)に依頼する関数
	onEdit: (id: number, newText: string) => void; // 編集を親(App)に依頼する関数
};

const TodoItem = ({ todo, onToggle, onDelete, onEdit }: Props) => {
	// 編集モードかどうかを管理する state
	const [isEditing, setIsEditing] = useState(false);
	// 編集中のテキストを保持する state（初期値はタスクのテキスト）
	const [editText, setEditText] = useState(todo.text);

	// 編集内容を保存する処理
	const handleSave = () => {
		if (!editText.trim()) return; // 空なら何もしない
		onEdit(todo.id, editText); // 親(App)に「このタスクを更新して」と依頼
		setIsEditing(false); // 編集モードを終了
	};

	return (
		<li
			style={{
				display: "flex",
				alignItems: "center",
				justifyContent: "space-between",
				marginBottom: "0.5rem",
			}}
		>
			<div style={{ flex: 1 }}>
				{/* 完了チェックボックス */}
				<input
					type="checkbox"
					checked={todo.completed} // completed が true ならチェック済みにする
					onChange={() => onToggle(todo.id)} // チェック切り替え時に親に依頼
					style={{ marginRight: "0.5rem" }}
				/>

				{isEditing ? (
					<>
						{/* 編集モードの場合：入力欄と保存ボタンを表示 */}
						<input
							type="text"
							value={editText}
							onChange={(e) => setEditText(e.target.value)} // 入力が変わったら更新
							style={{ padding: "0.25rem", flex: 1 }}
						/>
						<button
							onClick={handleSave}
							style={{
								marginLeft: "0.5rem",
								padding: "0.25rem 0.5rem",
								background: "green",
								color: "white",
								border: "none",
								borderRadius: "4px",
								cursor: "pointer",
							}}
						>
							保存
						</button>
					</>
				) : (
					<>
						{/* 通常モード：タスクの文字を表示 */}
						<span
							style={{
								textDecoration: todo.completed ? "line-through" : "none", // 完了済みなら取り消し線
								cursor: "pointer",
							}}
							onDoubleClick={() => setIsEditing(true)}
							// ダブルクリックで編集モードに切り替え
						>
							{todo.text}
						</span>
					</>
				)}
			</div>

			{/* 削除ボタン */}
			<button
				onClick={() => onDelete(todo.id)} // 親に「削除して」と依頼
				style={{
					background: "red",
					color: "white",
					border: "none",
					borderRadius: "4px",
					cursor: "pointer",
					padding: "0.25rem 0.5rem",
					marginLeft: "0.5rem",
				}}
			>
				削除
			</button>
		</li>
	);
};

export default TodoItem;
