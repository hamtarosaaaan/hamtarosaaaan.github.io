ポートフォリオページです

## ファイル構成

このサイトは、`HTML`・`MD`・`JSON` を分けて管理しています。

| 種類 | 役割 | 例 |
|---|---|---|
| `HTML` | ページの見た目と配置 | `pages/index.html`, `pages/projects/sortoio.html` |
| `MD` | 本文の内容 | `content/home.md`, `content/sortoio.md` |
| `JSON` | 一覧に出す作品情報 | `content/projects.json` |

## 変更するとき

- `HTML` を変える: タイトル、説明、本文の読み込み先を調整
- `MD` を変える: 各ページの文章や画像を編集
- `JSON` を変える: 一覧のカード、タグ、リンクを追加・変更

## 追加の流れ

1. `content/` に新しい `MD` を追加する
2. `pages/projects/` に対応する `HTML` を作る
3. `content/projects.json` に作品情報を足す
