# ふぉくしーどAR
リアルイベントでふぉくしーどが配布する名刺をかざすと、ARコンテンツを楽しめるサイトです。

## 🛠 環境構築
開発には以下が必要です。

- Node.js v22.14.0 以上

はじめにリポジトリをクローンし、依存関係をインストールしてください。

```sh
git clone https://github.com/foxseedlab/foxseed-ar.git

cd foxseed-ar

npm install
```

## 💻 コマンド
| コマンド | 説明 |
| --- | --- |
| `npm run dev` | 開発サーバーを起動 |
| `npm run build` | TypeScriptのビルドとViteビルドを実行 |
| `npm run preview` | ビルドしたファイルをプレビュー |
| `npm run deploy` | ビルドして Cloudflare Workers にデプロイ |
| `npm run cf-typegen` | Cloudflare Workers の型定義を生成 |

## 📁 リポジトリ構造
```sh
/
├── dist/                  # ビルド出力先
│   ├── client/            # クライアントサイドのビルド
│   └── foxseed_ar/        # Cloudflare Workers のビルド
├── public/                # 静的ファイル（画像など）
├── src/                   # クライアントサイドのソースコード
│   ├── App.tsx            # ルートアプリケーションコンポーネント
│   ├── index.css          # グローバルCSS
│   ├── main.tsx           # エントリーポイント
│   └── vite-env.d.ts      # Vite環境の型定義
├── worker/                # サーバーサイドのソースコード
├── biome.jsonc            # Biome設定ファイル
├── index.html             # HTMLエントリーポイント
├── tsconfig.json          # TypeScript設定
├── vite.config.ts         # Vite設定ファイル
├── wrangler.jsonc         # Cloudflare Workers の設定
└── package.json           # 依存関係とスクリプト
```

## 🔀 ブランチ戦略
[GitHub Flow](https://docs.github.com/en/get-started/quickstart/github-flow) を採用しています。

<div align="center">
<small>
© 2025 ふぉくしーど
</small>
</div>
