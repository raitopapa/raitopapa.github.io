# Sonnet × Codex 共同開発ハンドオフ規約 v1.0

> Claude Sonnet（Anthropic）と OpenAI Codex がローカルリポジトリを共有して並行開発するためのプロトコル。両AIが衝突なく協調できることを最優先に設計。

---

## 0. 前提

- **共有対象**: 本リポジトリ（`raitopapa.github.io`、GitHub Pages、ブランチ `main`）
- **共通の正典**: [SPEC.md](SPEC.md) — 全タスク・優先度・受け入れ基準
- **進捗ボード**: [STATUS.md](STATUS.md) — タスクの状態を文字列で管理（誰が着手中か等）
- **両AIともローカル `git` で操作**。pull → 作業 → push → PR の標準フロー
- **人間（オーナー）**が最終マージ判断

---

## 1. タスク選択と表明

### 1.1 着手前のチェック

```
1. git fetch && git checkout main && git pull
2. docs/STATUS.md を確認
3. SPEC.md §6 のタスクリストから「status: todo」かつ依存解消済みのものを選ぶ
4. 短時間（1日以内）で完了可能なものを優先
```

### 1.2 表明（クレーム）

`docs/STATUS.md` の該当行を編集し、**1コミットだけ**で push:

```diff
- T-P1-101 | Extract common layout partials | todo |  | -
+ T-P1-101 | Extract common layout partials | in-progress(claude-sonnet) | 2026-05-03 | task/T-P1-101-extract-layout
```

コミットメッセージ: `chore(status): claim T-P1-101`

このコミットを **push してから** 実装を始める。push 失敗時（コンフリクト）は最新を取り込んで別タスクへ譲歩。

### 1.3 競合時のルール

- **同時claim検出**: PR 作成時に GitHub 上で衝突発覚 → タイムスタンプが早い方が優先、後発はrevertして別タスクへ
- **24h 進展なし**: 着手者が放棄したとみなし、他方が claim 可能（claim時に旧status行をログとして PR 説明に残す）

---

## 2. ブランチとコミット

### 2.1 ブランチ命名

```
task/{TASK_ID}-{kebab-case-summary}

例:
task/T-P0-001-fix-hero-css
task/T-P1-102-i18n-json-extraction
```

### 2.2 コミットメッセージ

既存リポジトリの慣習を踏襲（日本語OK、prefix は英語）:

```
feat: 共通レイアウトを partials/ に抽出
fix: index.html のヒーロー CSS 構文エラーを修正
docs: SPEC.md に T-P3-307 を追加
refactor: i18n を JSON ファイルに分離
chore(status): claim T-P1-101
```

タスクIDを本文の最後に含める:

```
feat: 共通レイアウトを partials/ に抽出

各HTMLからheader/nav/footer/lang-barをfetchで動的挿入。
SPEC §6 ADR-02 準拠（Vanilla JS のみ）。

Refs: T-P1-101
```

### 2.3 1タスク = 1 PR の原則

- タスクの粒度が大きすぎる場合は SPEC.md でサブタスクに分割してから着手
- 「ついで修正」は別タスクとして切り出す（[mcp__ccd_session__spawn_task] 的な発想）
- 例外: 同一ファイルに不可分な変更がある場合のみ複数タスクをまとめて可（PR説明で全タスクIDを列挙）

---

## 3. PR / マージ

### 3.1 PR テンプレ

```markdown
## タスク
- [T-P1-101] Extract common layout partials

## 変更内容
- assets/partials/{header,footer,navbar,langbar}.html を新設
- assets/js/layout.js が fetch + innerHTML で挿入
- 6つのHTMLから重複部分を削除（行数 -32%）

## 受け入れ基準
- [x] 各HTMLの行数 30% 以上削減
- [x] 見た目同等（手元で目視確認）
- [x] Lighthouse PWA/Best/Perf 各95以上
- [x] i18n（ja/en）両言語動作

## 動作確認
`python -m http.server 8080` で全6ページ + 言語切替 + PWAインストール

## 影響範囲
- すべてのHTMLページに影響。SW のキャッシュリストに partials を追加。

## Author
claude-sonnet (via raitopapa)
```

### 3.2 マージ条件

- 受け入れ基準すべてチェック済み
- Lighthouse 主要4指標で **regression なし**（落ちる場合は理由を PR に明記）
- リンク切れなし（HTML5 validator + 内部リンク確認）
- i18n の ja/en 両方で目視確認済み
- 人間（オーナー）の approve

### 3.3 マージ後

着手者は以下を **同じPRの最終コミット**または**直後のコミット**で完了:

```diff
- T-P1-101 | ... | in-progress(claude-sonnet) | 2026-05-03 | task/...
+ T-P1-101 | ... | done | 2026-05-03 | #PR番号
```

---

## 4. コード規約

### 4.1 必ず守る

- **言語**: HTML / CSS / Vanilla JavaScript のみ（[SPEC ADR-02](SPEC.md)）
- **依存追加**: CDN ライブラリは SRI 必須、バージョン固定
- **i18n**: 文言ハードコード禁止（`assets/i18n/{ja,en}.json` 経由）
- **CSS変数**: `assets/css/tokens.css` のトークンを使う（page-local変数を新設しない）
- **IndexedDB**: `assets/js/db.js` 経由でアクセス（直接 `indexedDB.open` 禁止）
- **アナリティクス**: PII 送信禁止、同意なき場合は計測停止

### 4.2 推奨

- **コメントは「なぜ」だけ**: 「何をしているか」は識別子で表現
- **モジュール分割**: 1ファイル500行を超えたら分割を検討
- **エラー処理**: ユーザー向けに必ず日本語メッセージ（i18nキー経由）

### 4.3 禁止事項

- フレームワーク導入（React/Vue/Svelte 等）
- ビルド工程の追加（webpack/vite/rollup）— 例外は GitHub Actions の minify のみ
- 既存タスクIDを再利用してのスコープ拡張（必ず新IDを発行）
- `main` への直接 push（緊急時はオーナーのみ）
- API キー・シークレットのコミット（`.env.example` のみ可）
- 樹木医監修文言の改変（事実誤認・E-E-A-T 毀損のリスク）

---

## 5. AI 固有の注意

### 5.1 Sonnet（Claude）担当時

- ファイル編集前に `Read` で必ず現状確認
- マルチファイル変更は `TodoWrite` で進捗管理
- セッションをまたぐ場合は `docs/STATUS.md` のみで状態継承（ローカルメモリに頼らない）

### 5.2 Codex（OpenAI）担当時

- セッションが context を失いやすいので、PR 作業はできるだけ単一セッション内で完結
- `docs/STATUS.md` と SPEC.md を最初に必ず読む
- 不明点は実装せずに PR 内で `## 質問` セクションを設け、人間に判断を委ねる

### 5.3 共通

- どちらのAIも「自分のリポジトリ」と勘違いしない（人間が最終決定者）
- 大幅変更（>500行 diff）は事前に SPEC.md に提案を追記してから着手
- マネタイズに関わる UI 変更は人間レビュー必須（決済・広告・プラン表示）

---

## 6. インシデント対応

| 事象 | 対応 |
|---|---|
| 本番（github.io）で見た目崩れ | 人間に即連絡、原因特定後 revert PR を最優先 |
| AdSense 警告 | 該当広告枠を一時停止、48h 以内に対応 |
| 認証/決済の障害 | Stripe/Supabase ダッシュボードを確認、ユーザー影響範囲を特定後に告知 |
| 個人情報疑義 | 該当データを直ちにローカル＋クラウドから削除、privacy.html に経緯記載 |
| AI同士の認識ズレ | SPEC.md を真とする。SPEC不備が原因なら SPEC 改訂を最優先タスク化 |

---

## 7. 連絡手段

- **同期**: なし（両AIは非同期で動く前提）
- **非同期**: `docs/STATUS.md` + PR コメント
- **人間との連絡**: PR description の `## 質問` セクション、または contact.html 経由

---

## 8. このドキュメントの更新

- 改訂は `docs(handoff): vX.Y` タスクとして PR
- 大幅変更は SPEC.md にも反映
- 両AIに対し公平・対称であること
