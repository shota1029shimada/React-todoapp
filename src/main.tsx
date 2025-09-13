// Reactアプリのエントリーポイント
import { StrictMode } from 'react' //React の StrictMode フックをインポート
import { createRoot } from 'react-dom/client' //React の createRoot 関数をインポート
import './index.css'
import App from './App.tsx'//App コンポーネントをインポート

createRoot(document.getElementById('root')!).render( //ルート要素を取得
  <StrictMode>
    <App /> //App コンポーネントをレンダリング
  </StrictMode>,
)
