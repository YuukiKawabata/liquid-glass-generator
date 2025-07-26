# Liquid Glass Generator

Apple Liquid Glassデザインシステムを誰でも簡単に実装できるWebベースのビジュアルエディターです。美しいガラスモーフィズムUIコンポーネントの生成を可能にします。

## 🚀 機能

- **ビジュアルエディター**: リアルタイムプレビューでガラス効果を調整
- **パラメータ調整**: ブラー、透明度、彩度、境界線の半径などを自由にカスタマイズ
- **多形式対応**: CSS、HTML、React、Vueコンポーネントの生成
- **プリセット**: Modern、Subtle、Boldなど事前定義されたスタイル
- **レスポンシブ**: 3分割パネルのサイズを自由に調整可能
- **ダークモード**: ライト/ダークテーマの切り替え

## 🛠️ 技術スタック

- **Frontend**: Next.js 14 (App Router), React 18, TypeScript
- **Styling**: Tailwind CSS
- **UI**: カスタムコンポーネント
- **State Management**: React useState

## 📦 インストール

```bash
# リポジトリをクローン
git clone https://github.com/YuukiKawabata/liquid-glass-generator.git

# ディレクトリに移動
cd liquid-glass-generator

# 依存関係をインストール
npm install

# 開発サーバーを起動
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてアプリケーションを確認できます。

## 🎨 使い方

1. **プリセット選択**: 左パネルで事前定義されたスタイルを選択
2. **パラメータ調整**: スライダーやカラーピッカーで効果をカスタマイズ
3. **リアルタイムプレビュー**: 中央パネルで変更結果を即座に確認
4. **コード生成**: 右パネルで希望する形式のコードを取得
5. **コピー機能**: ワンクリックでコードをクリップボードにコピー

## 📱 レスポンシブデザイン

- パネル間の境界をドラッグしてサイズを調整可能
- 左パネル: 240px〜500px（コントロールパネル）
- 右パネル: 280px〜600px（コード出力）
- 中央パネル: 残りスペースを自動調整（プレビューエリア）

## 🎯 対応コンポーネント

- **Card**: ガラス効果のカードコンポーネント
- **Button**: 透明感のあるボタン
- **Modal**: モーダルダイアログ
- **Panel**: 汎用パネル

## 🎨 出力形式

- **CSS**: 純粋なCSSコード
- **HTML**: HTMLとCSSの組み合わせ
- **React**: Reactコンポーネント（TypeScript対応）
- **Vue**: Vueコンポーネント

## 🚧 開発中の機能

- ユーザー認証とカスタムプリセット保存
- より多くのコンポーネントタイプ
- アニメーション効果
- エクスポート/インポート機能

## 🤝 貢献

プルリクエストやイシューの報告を歓迎します！

## 📄 ライセンス

MIT License

## 👨‍💻 開発者

Created by [YuukiKawabata](https://github.com/YuukiKawabata)

---

**Apple Liquid Glass**スタイルの美しいUIコンポーネントを簡単に作成しましょう！ 🌟
