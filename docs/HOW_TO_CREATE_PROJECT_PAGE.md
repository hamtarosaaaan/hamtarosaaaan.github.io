# プロジェクトページの作成方法

Markdown ベースのプロジェクトページを作成する手順です。

## 1. 準備

このテンプレートを使用して新しいプロジェクトページを作成します。

- HTML テンプレート: `templates/project-template.html`
- Markdown テンプレート: `templates/content-template.md`
- 一覧データ: `content/projects.json`
- HTML は `pages/` 配下に置く構成です

## 2. ファイルを作成する

### Step 1: HTML ファイルを作成

`templates/project-template.html` をコピーして、`pages/projects/` 配下に新しいプロジェクト用の HTML ファイルを作成します。

例：`pages/projects/copypen.html`, `pages/projects/skbg.html` など

### Step 2: HTML ファイルを編集

作成した HTML ファイルの以下の部分を置き換えます：

**ここが自分で変える場所です。**

```html
<!-- 変更前 -->
<title>PROJECT_TITLE - Tomoya Itagaki</title>
<meta name="description" content="PROJECT_TITLEのプロジェクト詳細ページ">

<!-- 変更後 -->
<title>Copypen - Tomoya Itagaki</title>
<meta name="description" content="Copypenのプロジェクト詳細ページ">
```

```html
<!-- 変更前 -->
<h1 class="page-title">PROJECT_TITLE</h1>
<p class="page-subtitle">プロジェクトの概要がここに入ります</p>

<!-- 変更後 -->
<h1 class="page-title">Copypen</h1>
<p class="page-subtitle">Web クリップボードツール</p>
```

```html
<!-- 変更前 -->
<div id="markdown-output" data-file="../../content/PROJECT_ID.md" class="markdown-content"></div>

<!-- 変更後 -->
<div id="markdown-output" data-file="content/copypen.md" class="markdown-content"></div>
```

### Step 3: Markdown ファイルを作成

`templates/content-template.md` をコピーして、新しいプロジェクト用の Markdown ファイルを作成します。

例：`content/copypen.md`, `content/skbg.md` など

### Step 4: Markdown ファイルを編集

`content/copypen.md` などを開いて、プロジェクトの詳細を書いてください。

## 3. Markdown の書き方

### 見出し

```markdown
## セクション名
### サブセクション名
```

### テキスト装飾

```markdown
**太字**
*イタリック*
```

### リスト

```markdown
- 項目1
- 項目2
- 項目3
```

### リンク

```markdown
[リンクテキスト](URL)
```

### 画像

```markdown
<img src="img/filename.png" alt="説明" class="markdown-image">
```

**注意**: `<img>` タグを使用してください（`![alt](url)` ではなく）

### YouTube 埋め込み

```markdown
<div class="markdown-media"><iframe src="https://www.youtube.com/embed/VIDEO_ID" title="動画タイトル" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" sandbox="allow-same-origin allow-scripts allow-presentation" allowfullscreen></iframe></div>
```

**注意**: YouTube の `VIDEO_ID` は動画 URL の `https://www.youtube.com/watch?v=VIDEO_ID` の部分です。

### HTML を含める

Markdown 内に HTML タグを直接含めることができます：

```markdown
<div class="custom-class">
  カスタム HTML コンテンツ
</div>
```

## 4. プロジェクトをリストに追加

作成したプロジェクトページを `content/projects.json` に追加します。

最低限、以下の項目を入れてください。

```json
{
  "title": "Copypen",
  "category": "開発",
  "projectType": "Product Design",
  "description": "作品の説明",
  "tags": ["Design", "UX"],
  "href": "projects/copypen.html",
  "image": "img/copypen-image.jpg",
  "imageAlt": "Copypen の画像"
}
```

### 画像の使い方

- `image` に画像ファイルのパスを入れると、カード上部に表示されます
- `imageAlt` は画像の説明文です
- `image` がない場合は `headerStyle` のグラデーションが表示されます
- 一覧カード用の画像は **横長 16:9** を推奨します（例: `1200×675`、`1600×900`）
- 詳細ページ本文の画像は **横 1200px 以上** を目安にするときれいです
- 画像は `object-fit: cover` で表示されるため、端が少し切れても大丈夫な構図にすると安全です

### tags の使い方

- `tags` は一覧カードのラベルです
- `研究`, `開発`, `ブログ` を入れると、今の絞り込みボタンに反映されます
- `Python`, `toio`, `Algorithm` のような技術タグもそのまま追加できます

## 5. 完成！

プロジェクトページが完成しました。`pages/index.html` の一覧は `content/projects.json` を元に表示されます。

## テンプレートファイル一覧

- `templates/project-template.html` - `pages/projects/` 用の HTML テンプレート
- `templates/content-template.md` - プロジェクトページの Markdown テンプレート
- `docs/HOW_TO_CREATE_PROJECT_PAGE.md` - このファイル
- `content/projects.json` - 一覧表示用のプロジェクト一覧データ

## よくある質問

### Q: 画像を追加したいのですが？

A: `img/` フォルダに画像ファイルを置いて、Markdown で以下のように指定します：

```markdown
<img src="img/my-image.png" alt="説明" class="markdown-image">
```

### Q: YouTube 動画が表示されません

A: 以下の点を確認してください：
- `VIDEO_ID` が正しいか
- `allow` と `sandbox` 属性が含まれているか
- ローカルファイルで開いている場合は、簡易サーバーを使用してください（`python -m http.server` など）

### Q: 新しいスタイルを追加したいのですが？

A: `new_style.css` を編集してカスタム CSS クラスを追加し、Markdown で HTML タグに `class="my-class"` を指定してください。

### Q: セクション順序を変更したいのですが？

A: Markdown ファイル内で見出しの順序を変更するだけで OK です。

### Q: 一覧に出ないのですが？

A: `content/projects.json` に `href` と `title` が入っているか確認してください。

---

質問やトラブルがあれば、このドキュメントを参照するか、テンプレートを確認してください！
