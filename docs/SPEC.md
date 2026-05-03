# 樹木医ツール — 改善・マネタイズ仕様書 v1.2

> **対象期間**: 2026-05 〜 2026-12（v3.1〜v4.0）
> **共同開発**: Claude Sonnet（Anthropic）+ OpenAI Codex
> **最終目標**: 月次広告収益 → B2C プレミアム → B2B SaaS への3段階マネタイズ
> **方針**: 現状実装は積極的に削除・統合・刷新する。「無料・樹木医監修」というブランドエクイティのみ死守。
> **進行原則**: **Phase 3 は需要検証ゲートを通過するまで凍結**。先に P0/P1/P2 で計測基盤・コンテンツ・広告を整え、KPI が閾値に達してから認証・決済・SaaS化に着手する。
> **コスト制約（v1.2 新規）**: **運用コスト合計 ¥500/月以下**を強制制約。これを超える施策は Gate 通過＋raitopapa 個別承認まで起動禁止。詳細は §7.1。

## 改訂履歴
- **v1.2（2026-05-03）**: raitopapa が D1-D10 を最終承認（仮確定→確定）、ターゲット転換確定、コスト上限 ¥500/月 制約追加（§7.1）、本体 docs/ 統合は Codex 担当へ確定
- **v1.1（2026-05-03）**: D1-D10 の仮決定を §11 に追加、Phase 3 凍結ゲートを §4.5 に追加、本体 docs/ との統合方針を §12 に追加（Codex レビュー反映）
- **v1.0（2026-05-03）**: 初版（Claude Opus 4.7）

---

## 0. TL;DR（経営判断が必要な3点）

| 判断事項 | 推奨 | 根拠 |
|---|---|---|
| **A. 主ターゲット転換** | 樹木医（〜3,000人）→ **庭木オーナー＋造園業者** にシフト | 樹木医人口はAdSenseでもサブスクでも市場小さすぎる。庭木オーナーは数千万人、造園業者は約1.4万社。 |
| **B. マネタイズ三層構造** | 広告 → 個人 ¥480/月 → 法人 ¥9,800/月 | PlantNet（無料）, Plantix（無料+広告）, ArboStar/SingleOps（$150-200/月）の中間ポジション |
| **C. 大幅削除/統合** | TRAQ・CTLAは「Pro無料・透かし入りPDF」へ転換、survey は中核に昇格しSaaSの母体に | 現状TRAQ/CTLAは収益貢献ゼロかつアクセス少。survey の IndexedDB 設計が SaaS 化の基盤になる。 |

**Sonnet/Codexへ**: §6 のタスクリストから着手。各タスクは独立PRで提出。§9 のハンドオフ規約必読。

---

## 1. 現状把握サマリ

### 1.1 強み（守るべき資産）

- **樹木医監修ブランド** — E-E-A-T の "Expertise" が確立済み
- **6ツール × 40+樹種** — JP国内では類似ニッチサイトより充実
- **PWA + IndexedDB + オフライン動作** — 現場ツールとして競合優位
- **i18n（ja/en）** — 海外被リンク獲得の素地
- **AdSense 承認済み**（pub-8180543096745567）— 収益化のスタートライン突破済み
- **完全静的サイト（GitHub Pages）** — 運用コストほぼゼロ

### 1.2 弱み（解消すべき負債）

| # | 弱点 | 影響度 | 解消優先度 |
|---|---|---|---|
| W1 | 各HTMLが1000-2353行の巨大化、i18n/モーダル/SW関連JSが各ページで重複 | 保守性・LCP | P1 |
| W2 | **[index.html:64](index.html:64) のCSS構文破損**で `.hero` セレクタ消失 | UX（ヒーロー崩れ） | **P0** |
| W3 | Google Analytics 未実装（privacy.htmlには記載あり＝**虚偽表示**） | 収益最適化・法的リスク | **P0** |
| W4 | contact.html の送信処理が偽装success（バックエンド未接続） | 信用問題 | **P0** |
| W5 | データがツール間で連携しない（survey ↔ diagnosis ↔ checklist 独立） | UX・LTV | P1 |
| W6 | ブログ・記事コンテンツゼロ → ツール単体ではSEO天井低い | オーガニック流入 | P1 |
| W7 | 写真記録はあるが EXIF GPS / AI診断 / クラウド同期 すべて未対応 | 競合差別化 | P2 |
| W8 | 色変数・命名・ナビゲーション・フッターがページ間で不揃い | 信頼感・保守 | P2 |
| W9 | 認証・決済・メール購読基盤ゼロ → 有料化への橋なし | マネタイズ天井 | P1（v4.0） |
| W10 | 外部CDN（leaflet/qrcode）バージョン固定なし → サプライチェーン攻撃面 | セキュリティ | P1 |

### 1.3 削除/統合すべきもの

- **`pruning.html` の地域補正UI** が pruning と diagnosis で別実装 → 共通モジュール化
- **`checklist.html` のPDF出力**（コメントで「未実装」とある機能） → 削除 or 完成
- **PWAバナーJS**（index.html 末尾）が他ページにない → 共通化または削除
- **TRAQ/CTLA への AdSense 配置なし**（プロ向けと判断したが実際にはSEO流入もあり） → 配置追加すべき
- **`sw.js` のpush/syncハンドラ**（コメント「将来の拡張用」） → 実装するか削除

---

## 2. 競合・参考事例（海外＋国内）

| サービス | カテゴリ | 価格 | 学べる点 | 注意点 |
|---|---|---|---|---|
| **i-Tree MyTree** (USDA) | 個人向け生態系価値 | 完全無料 | 公的機関後ろ盾・市民科学 | 商業化不可モデル |
| **PlantNet** | 樹種AI同定 | 完全無料・78,225種 | API公開で被リンク獲得 | 寄付・助成金頼み |
| **Plantix** | AI病害診断 | 無料+広告 | 写真診断98%精度・GPSアウトブレイク追跡 | 作物中心、樹木は弱い |
| **OpenTreeMap** (AGPL) | 自治体樹木台帳 | OSS+SaaS有料 | クラウドソース台帳の基盤 | i-Tree依存 |
| **ArboStar** | B2B 業務支援 | $150/月〜 | オフライン同期・グローブ操作対応 | 北米市場特化 |
| **SingleOps** | B2B CRM+見積 | $200/月〜 | 請求・見積・ルート最適化 | 樹木専用ではない |
| **ArborNote** | 樹木台帳+営業 | $200/月〜 | 「導入後40%売上増」の実績訴求 | オフライン弱い |
| **PLATEAU 仙台市** | 公共DX | 公的事業 | 3D都市モデル+市民協働WS | 商用展開なし |
| **ケア樹** (日本) | 介護記録 | — | （誤認、樹木関係なし） | — |
| **Agrion果樹** | 果樹生産工程 | 不明 | QRコードで樹木識別、生産工程記録 | 果樹特化 |
| **U-GREEN** | CO2吸収量算定API | API課金 | 連携先候補 | 自前実装すれば不要 |

### 2.1 ポジショニング・マップ

```
                 専門特化 ←——————————————————→ 一般向け
       高価格   [ArboStar/SingleOps]           [プロ会員制庭園誌]
                       ↑
               [ArborNote]
                       ↑
   低価格              ↑                          [PlantNet/iTree]
              【現在地：樹木医ツール（無料・全部入り）】
                       ↓
              【目標位置：庭木Freemium + 業者Pro + 自治体Enterprise】
```

**戦略**: 「無料診断ツール」を集客ファネル入口とし、写真記録・複数物件管理・PDF出力を有料化境界線に置く。

---

## 3. ターゲット・ペルソナ再定義

### Persona A: 庭木オーナー（B2C・最大ボリューム）
- 30-60代、自宅庭木〜10本、年1回剪定発注
- 痛点: 「葉が枯れた、何の病気？」「いつ剪定？」「業者に頼むべき価格は？」
- 取得経路: 検索（「松 葉 黄色 原因」「桜 剪定 時期」）
- マネタイズ: AdSense + アフィリエイト（剪定鋏・薬剤・業者見積）+ 個人サブスク¥480/月

### Persona B: 造園業者・植木職人（B2C/B2B境界）
- 20-50代、個人事業〜従業員5人規模、案件月10-30件
- 痛点: 「顧客への説明資料」「見積根拠」「現場記録の効率化」
- 取得経路: SNS、業界紙、口コミ
- マネタイズ: 個人Pro¥1,980/月（PDF白透かしなし、複数物件、写真クラウド同期）

### Persona C: 樹木医（既存ロイヤルユーザー・防衛）
- 40-70代、登録3,000人、診断書・鑑定業務
- 痛点: 「TRAQ計算の効率化」「CTLA鑑定書」「現地データの整理」
- 取得経路: 樹木医会・大学経由
- マネタイズ: 個人Pro無料延長 or 法人Enterprise（事務所単位）

### Persona D: 自治体・公園管理（B2B・最大単価）
- 公園緑地課、街路樹係、指定管理者
- 痛点: 「街路樹台帳がExcel/紙」「市民通報の一元化」「点検履歴の継承」
- 取得経路: 自治体DXイベント、PLATEAU連携、見積比較
- マネタイズ: Enterprise¥9,800〜¥49,800/月（樹木数・ユーザー数階段制）

---

## 4. 三段階マネタイズ・ロードマップ

### Phase 1: 広告最適化（v3.1, 2ヶ月）
- GA4 + Search Console 接続、行動分析開始
- TRAQ/CTLA/survey にも AdSense 配置（現在ゼロ）
- 高エンゲージメント位置に追加2枠（記事中・記事下）
- アフィリエイト（楽天・Amazon）導入：剪定鋏・薬剤・書籍
- **目標**: AdSense月¥3,000 → ¥30,000、アフィ月¥10,000

### Phase 2: コンテンツSEO + メール購読（v3.2-3.3, 4ヶ月）
- ブログ（25記事）：「症状別診断ガイド」「樹種別コラム」
- 用語集ページ（200語、内部リンクハブ）
- 埋め込みウィジェット（剪定時期判定 iframe）配布で被リンク獲得
- メール購読（季節リマインダー：5月の剪定、9月の害虫等）
- **目標**: オーガニック流入 月1,000PV → 月15,000PV、メール会員 1,000人

### Phase 3: Freemium課金 + B2B SaaS（v3.4-4.0, 6ヶ月）
- 認証（Supabase Auth or Auth.js + GitHub OAuth）
- Stripe + コンビニ決済（Komoju）
- **個人Pro ¥480/月** — 履歴無制限・PDF透かし削除・写真クラウド同期
- **個人Plus ¥1,980/月** — Pro機能 + 複数物件 + GeoJSON出力 + 優先サポート
- **法人Pro ¥9,800/月** — 5ユーザー・100物件・自治体プリセット
- **法人Enterprise 要問合せ** — 無制限・SSO・PLATEAU連携・SLA
- **目標**: 有料会員 100人/法人5社、MRR ¥150,000

### Phase 4（探索）: API/ウィジェット課金、AI診断従量課金
- PlantNet 風 API 公開（樹種同定、有償プラン）
- Claude API 経由 写真AI診断（従量¥10/枚 or サブスク内枠）

---

## 4.5 Phase 3 凍結ゲート（v1.1 追加・Codex 提案採用）

Phase 3（Supabase + Stripe + SaaS化）は **以下のすべてを満たすまで開始しない**。Phase 1-2 の需要検証で「無料サイトとして成立しない＝有料化しても買い手がいない」と判明したら、Phase 3 を破棄して別戦略を検討する。

### Gate 条件（すべて AND）

| KPI | 閾値 | 計測手段 | 達成見込み時期 |
|---|---|---|---|
| G1. 月間オーガニックセッション | **15,000+** | GA4 / Search Console | Phase 2 完了後3ヶ月 |
| G2. ツール完了率（診断・剪定・チェック） | **40%以上** | GA4 イベント | Phase 1 完了後 |
| G3. リピート訪問率（30日以内） | **20%以上** | GA4 ユーザー | Phase 2 完了後 |
| G4. メール購読者数 | **1,000人以上** | 配信サービス | Phase 2 完了後 |
| G5. 「有料Pro機能を使いたい」アンケート回答率 | **回答者中30%以上** | フォーム | Phase 2 中盤 |
| G6. 樹木医監修者の実名・略歴ページ公開（D5） | 公開済み | 目視 | Phase 1 中 |
| G7. 独自ドメイン（D10）取得・移行 | 完了 | DNS | Phase 1 中 |

### Gate 不通過時の代替戦略

- **広告のみで月額¥100,000+ を狙う**（コンテンツ拡充、海外SEO、英語圏トラフィック取り込み）
- **B2B 単発販売**（PDF鑑定書テンプレ販売、自治体向けレポート受託）
- **OSS 寄付モデル**（GitHub Sponsors、PlantNet 同様）

---

## 5. 仕様変更の前提（Architecture Decision Records）

### ADR-01: 静的サイト維持 / バックエンド最小化
- GitHub Pages のまま運用、認証・決済は **Supabase + Stripe** に外部化
- 理由: ホスティングコストゼロ、GitHubのCI/CDで完結、Codex/Sonnet がローカル開発しやすい

### ADR-02: フロントエンド技術選定
- **Vanilla JS のまま継続**（フレームワーク導入しない）
- 共通モジュール化のため `assets/js/common.js` `assets/css/common.css` を新設、各HTMLからインクルード
- 理由: 学習コスト・バンドル肥大・Codex×Sonnet 両者が即座に編集可能であること優先

### ADR-03: データモデル統一
- IndexedDB スキーマを `assets/js/db.js` に集約、全ツール共有
- ストア: `surveys` / `trees` / `photos` / `inspections` / `diagnoses` / `appraisals`
- クラウド同期は `provider` フィールドで `local-only` / `cloud` を切替

### ADR-04: i18n 共通化
- 各HTML埋め込みを廃止、`assets/i18n/{ja,en}.json` をfetchして適用
- 韓国語(ko)・繁体字(zh-TW)を v3.5 で追加

### ADR-05: ビルド工程
- 導入しない。Codex/Sonnet 双方が `python -m http.server` で即確認できる状態を維持
- minify は GitHub Actions で配信時のみ（オプション）

### ADR-06: AI診断機能のモデル選定
- 写真AI診断は **Claude API（claude-haiku-4-5-20251001）** を使用
- バックエンドは Supabase Edge Functions、Anthropic SDK + プロンプトキャッシュ必須
- 理由: 樹木医監修ブランドとAnthropic技術スタックの整合、現状PWAクライアントと自然な接続

---

## 6. タスクリスト（実装ハンドオフ用）

> **凡例**:
> - **ID**: `T-PNNN`（P=Phase 0/1/2/3/4, NNN=連番）
> - **Owner Hint**: `Sonnet` / `Codex` / `either` — どちらが向くかの目安（強制ではない）
> - **Effort**: S（〜2h）/ M（半日）/ L（1日〜）/ XL（複数日）
> - **Dep**: 依存タスクID
> - **Status**: `todo` / `in-progress(name)` / `review` / `done` — `docs/STATUS.md` で管理

---

### Phase 0: 緊急修正（P0、今週中）

#### T-P0-001: index.html の `.hero` CSS 破損修正
- **Owner Hint**: either / **Effort**: S / **Dep**: なし
- **詳細**: [index.html:64](index.html:64) で `.lang-btn:hover { ... }` の閉じカッコ後、`background: var(--bark);...` がセレクタなしで続いている。`.hero {` セレクタを補完。
- **受け入れ基準**: ヒーロー画像背景・パディング・アニメが復活し、Lighthouse Best Practices 100点

#### T-P0-002: contact.html のフォーム接続（Web3Forms 第一候補）
- **Owner Hint**: Codex / **Effort**: S / **Dep**: なし / **コスト**: ¥0
- **詳細**: 偽装success を撤去し、**Web3Forms（無料・無制限）に接続**（Formspree 月50件は将来的に枯渇するため非推奨）。スパム対策に honeypot + Web3Forms 内蔵 hCaptcha。
- **受け入れ基準**: 実メールが i007955@gmail.com に届く。送信失敗時のエラーUIあり。プライバシーポリシーに送信先サービス（Web3Forms）を追記。アクセスキーは環境にハードコードせず、HTML埋め込みで OK（Web3Forms はキーがフロント露出前提の設計）。

#### T-P0-003: GA4 + Search Console 設置
- **Owner Hint**: either / **Effort**: S / **Dep**: なし
- **詳細**: GA4 タグを `assets/js/analytics.js` に集約、全ページ末尾で読み込み。同意バナー（GDPR/個人情報保護法準拠）併設。Search Console 所有権確認は `meta` タグ。
- **受け入れ基準**: GA4 リアルタイムでイベント確認、privacy.html を実態に合わせて更新

#### T-P0-004: 外部CDN ライブラリの SRI（Subresource Integrity）化
- **Owner Hint**: Sonnet / **Effort**: S / **Dep**: なし
- **詳細**: leaflet, qrcodejs の `<script>` `<link>` に `integrity=` `crossorigin=anonymous` を付与。バージョンも明示固定。
- **受け入れ基準**: CSP違反なく動作、改竄時は読み込み拒否

---

### Phase 1: 広告最適化（v3.1、4-8週）

#### T-P1-101: 共通レイアウト抽出（header/nav/footer/lang-bar）
- **Owner Hint**: Sonnet / **Effort**: L / **Dep**: T-P0-001
- **詳細**: 各HTMLの重複部分を `assets/partials/{header,footer,navbar,langbar}.html` に抽出、`fetch` + `innerHTML` で動的挿入する `assets/js/layout.js` を作る。SSR不要、初回FCP 100ms 以内に挿入。
- **受け入れ基準**: 各HTMLの行数 30% 以上削減、見た目・i18n・PWA動作同等

#### T-P1-102: i18n を JSON 外出し化
- **Owner Hint**: Codex / **Effort**: L / **Dep**: T-P1-101
- **詳細**: 各HTML内の `I18N` オブジェクトを `assets/i18n/{ja,en}.json` に統合、ページごとに名前空間（`diagnosis.*`, `pruning.*`）。`assets/js/i18n.js` がロード・適用。SWキャッシュ対象。
- **受け入れ基準**: 言語切替で全ページ表示崩れなし、JSON は人間が編集できる構造

#### T-P1-103: AdSense 配置の最適化（TRAQ/CTLA/survey に追加、index に記事下追加）
- **Owner Hint**: either / **Effort**: S / **Dep**: T-P0-003（GA4で計測したい）
- **詳細**: 現在ad-slotプレースホルダのみ。実コード（auto ads ではなく manual placement）で記事中・記事下に配置。CLS 防止のため固定サイズ予約。
- **受け入れ基準**: ads.txt は既存維持、Lighthouse CLS 0.05 以下、AdSense ポリシー違反なし

#### T-P1-104: アフィリエイト導線の追加（Amazon/楽天）
- **Owner Hint**: Codex / **Effort**: M / **Dep**: T-P1-103
- **詳細**: 診断結果ページに「対処に必要な道具」（剪定鋏・殺菌剤・防虫ネット）の楽天/Amazon リンク。ブロック化して「PR」明示（ステマ規制対応）。
- **受け入れ基準**: アフィID は環境変数化（リポに直書きしない）、リンクは `rel="sponsored nofollow"`

#### T-P1-105: PWA Service Worker の整理（push/sync の実装 or 削除）
- **Owner Hint**: Sonnet / **Effort**: M / **Dep**: T-P1-101
- **詳細**: `sw.js` の Background Sync を実装（survey のオフライン記録をオンライン復帰時に同期）するか、未使用なら削除。Push通知は v3.4 で実装するため一旦コメントアウト。
- **受け入れ基準**: SW のコードが「実装済みのみ」で構成、Lighthouse PWA 100点

#### T-P1-106: ヘッドレスデザインシステム化（CSS変数統一）
- **Owner Hint**: Sonnet / **Effort**: M / **Dep**: T-P1-101
- **詳細**: 色・タイポ・スペーシング変数を `assets/css/tokens.css` に集約。各ページの `:root` 重複を削除。ダークモードもここで一元化。
- **受け入れ基準**: 全ページで色・余白に一貫性、survey ダークモードが他ページにも適用可能

#### T-P1-107: SEO 強化（構造化データ拡張・パンくず・FAQPage）
- **Owner Hint**: Codex / **Effort**: M / **Dep**: なし
- **詳細**: 全ページに BreadcrumbList、診断ページに FAQPage、CTLA に HowTo を追加。`sitemap.xml` を Jekyll で自動生成化、lastmod 付与。OGP画像をツールごとに作成。
- **受け入れ基準**: Rich Results Test で全項目パス、Search Console エラーゼロ

---

### Phase 2: コンテンツSEO + メール（v3.2-3.3、8-16週）

#### T-P2-201: ブログ基盤（Jekyll posts）
- **Owner Hint**: Codex / **Effort**: M / **Dep**: T-P1-101
- **詳細**: `_config.yml` に Jekyll の collections 追加、`_posts/` ディレクトリ。`/blog/` 一覧ページ、記事テンプレート、関連ツールへの内部リンク。RSS生成。
- **受け入れ基準**: サンプル記事3本で動作確認、Lighthouse SEO 100点

#### T-P2-202: 季節記事25本の執筆（樹木医監修・人間ライター）
- **Owner Hint**: 人間（外注）/ **Effort**: XL / **Dep**: T-P2-201
- **詳細**: キーワード調査済みリストを別途提供。各2,000字以上、画像3枚以上、内部リンク必須。AI下書き→樹木医校正のパイプライン。
- **受け入れ基準**: 25本公開、Search Console 表示回数 月10,000以上

#### T-P2-203: 樹木用語集ページ（200語）
- **Owner Hint**: Codex / **Effort**: L / **Dep**: T-P2-201
- **詳細**: `/glossary.html`（または Jekyll collection）。ABC順・五十音順タブ。各用語に短い定義・関連ツールリンク。診断結果から該当用語へリンク。
- **受け入れ基準**: 200語以上、内部リンクハブとして機能（PageRank分散）

#### T-P2-204: 埋め込みウィジェット配布（剪定時期チェッカー）
- **Owner Hint**: Sonnet / **Effort**: L / **Dep**: T-P1-102
- **詳細**: pruning.html の核機能を 320×480 iframe 化。`/embed/pruning.html`。配布ページに「コピペ用埋め込みコード」+ バックリンク条件を明示。referrer 別アクセス計測。
- **受け入れ基準**: 第三者サイトでのテスト埋め込み成功、リファラ計測動作

#### T-P2-205: メール購読 + 季節リマインダー
- **Owner Hint**: Codex / **Effort**: L / **Dep**: T-P2-201
- **詳細**: Buttondown / ConvertKit / Mailerlite の無料枠で開始。トップ＋全記事末に登録フォーム。月1〜2回の「今月の樹木管理」配信。樹種別タグでセグメント。
- **受け入れ基準**: 登録1,000人時点で配信パイプライン安定、解除率 < 2%

#### T-P2-206: 内部リンク網の整備
- **Owner Hint**: Sonnet / **Effort**: M / **Dep**: T-P2-201, T-P2-203
- **詳細**: 各ツール下部に「関連記事」「関連用語」カード。Jekyll の data file から自動生成。orphan ページゼロ化。
- **受け入れ基準**: Screaming Frog で全ページが3クリック以内、orphan ゼロ

---

### Phase 3: Freemium + B2B SaaS（v3.4-4.0、16-32週）

#### T-P3-301: Supabase プロジェクト作成 + スキーマ設計
- **Owner Hint**: Sonnet / **Effort**: L / **Dep**: なし
- **詳細**: テーブル: `users`, `subscriptions`, `trees`, `inspections`, `photos`(Storage), `organizations`, `org_members`. RLS（Row Level Security）で個人/組織分離。スキーマは `supabase/migrations/` に。
- **受け入れ基準**: マイグレーション1コマンドで再現可能、RLSテストパス

#### T-P3-302: 認証 UI（メール/パスワード + Google OAuth）
- **Owner Hint**: Codex / **Effort**: L / **Dep**: T-P3-301
- **詳細**: `/auth/login.html`, `/auth/signup.html`, `/auth/reset.html`. Supabase Auth JS SDK。匿名利用も継続可能（ローカルIndexedDB のまま）。ログイン後はクラウド同期。
- **受け入れ基準**: ログイン/サインアップ/パスワードリセット動作、未ログインでも全ツール無料利用継続

#### T-P3-303: IndexedDB ↔ Supabase 同期エンジン
- **Owner Hint**: Sonnet / **Effort**: XL / **Dep**: T-P3-301, T-P3-302
- **詳細**: `assets/js/sync.js`. ローカル変更を queue → online 復帰時に push。コンフリクト解決は last-write-wins（v1）。写真は Supabase Storage に Base64 → Blob で送信。
- **受け入れ基準**: オフライン10件記録 → オンライン化で全件同期、3デバイスで結果一致

#### T-P3-304: Stripe 決済（個人 ¥480/¥1,980 月額）
- **Owner Hint**: Codex / **Effort**: L / **Dep**: T-P3-302
- **詳細**: Stripe Checkout + Customer Portal。Webhook で `subscriptions` 更新。日本円・税込表示。クレカのみ（コンビニは Komoju 検討）。
- **受け入れ基準**: テストカードで購読・解約・更新動作、領収書PDF発行

#### T-P3-305: Pro 機能ゲート（PDF透かし削除・履歴無制限）
- **Owner Hint**: either / **Effort**: M / **Dep**: T-P3-304
- **詳細**: 無料は履歴30日・PDFに「樹木医ツール」透かし。Pro は無制限・透かし無し・複数物件。`assets/js/feature-flags.js` で集中管理。
- **受け入れ基準**: 無料/Pro でUI差分明確、無料からPro遷移CTAが各所に配置

#### T-P3-306: PDF レポート出力（jsPDF + html2canvas）
- **Owner Hint**: Sonnet / **Effort**: L / **Dep**: T-P1-106
- **詳細**: TRAQ・CTLA・checklist・survey それぞれに「PDF出力」。テンプレ統一、ヘッダ/フッタ/ページ番号、樹木医監修印（任意）。日本語フォント埋め込み。
- **受け入れ基準**: A4縦/横で崩れず、Mac/Win/iOSで表示同一

#### T-P3-307: 写真AI診断（Claude haiku 4.5）
- **Owner Hint**: Sonnet / **Effort**: XL / **Dep**: T-P3-301
- **詳細**: Supabase Edge Function（Deno）から Anthropic SDK 呼び出し。プロンプトキャッシュ必須（system + 樹木医ナレッジ）。レート制限（無料 月3枚 / Pro 月50枚 / 法人 無制限）。
- **受け入れ基準**: 写真3パターンで妥当な診断（樹種推定+症状+疑い病害+次アクション）、コスト1枚 < ¥3

#### T-P3-308: 法人プラン UI（組織・メンバー・物件管理）
- **Owner Hint**: Codex / **Effort**: XL / **Dep**: T-P3-303
- **詳細**: `/org/settings`, `/org/members`, `/org/projects`. 招待メール、ロール（owner/admin/member）。物件＝複数樹木のグルーピング。
- **受け入れ基準**: 5ユーザー・100物件で操作レスポンス < 2s

#### T-P3-309: EXIF GPS 読み取り
- **Owner Hint**: either / **Effort**: M / **Dep**: T-P1-101
- **詳細**: 写真アップロード時に exif-js で GPS タグを読み、survey の位置として自動入力。地理院 reverse geocoding で住所取得。
- **受け入れ基準**: iPhone/Androidで撮影した写真から座標取得、精度誤差表示

#### T-P3-310: 樹木QRコード・現地貼付フロー強化
- **Owner Hint**: Codex / **Effort**: M / **Dep**: T-P3-303
- **詳細**: 既存QR生成を拡張、貼付後に他ユーザー（同組織）が読み取ると該当樹木の履歴ページへ。樹木専用URL `/t/{slug}`. 公開/限定公開選択可。
- **受け入れ基準**: スマホでQR → ログイン or 匿名閲覧、履歴正しく表示

---

### Phase 4: 探索（v4.0+、収益が立ち上がった後に着手）

#### T-P4-401: 樹種同定 API 公開（PlantNet 風）
#### T-P4-402: 自治体向け PLATEAU 連携
#### T-P4-403: 多言語追加（ko, zh-TW, de）
#### T-P4-404: ネイティブアプリ化（Capacitor）

---

## 7. 工数・収益試算（粗・コスト上限 ¥500/月 反映後）

| Phase | 工数（人日） | 月次コスト | コスト内訳 | 期待MRR | 制約適合 |
|---|---|---|---|---|---|
| Phase 0 | 2 | **¥0** | 無料サービスのみ | — | ✅ |
| Phase 1 | 15 | **¥100-170** | 独自ドメイン年¥1,200-2,000 のみ | ¥40,000（広告+アフィ） | ✅ |
| Phase 2 | 30（自前執筆＋AI下書き） | **¥100-170** | 同上、メール配信は無料枠（〜1,000人）で吸収 | ¥80,000 | ✅ |
| Phase 3 | 60 | **¥100-170** + 売上連動 | Supabase 無料枠・Stripe 手数料は売上連動 | ¥150,000 | ⚠️ Gate＋承認後 |
| Phase 4 | 60+ | 売上連動 | AI 推論・追加 SaaS は売上の範囲内 | ¥500,000+ | ⚠️ Gate＋承認後 |

> 売上 0 のままでも ¥500/月を絶対に超えない設計。独自ドメイン以外はすべて従量＝売上発生時のみコスト発生。

---

## 7.1 コスト上限 ¥500/月 を守る運用ガイドライン（v1.2 新規）

### 7.1.1 利用可能サービス（無料 / 低料金枠）

| カテゴリ | 採用サービス | 無料枠 | 越えた時の月額 | 採用根拠 |
|---|---|---|---|---|
| ホスティング | GitHub Pages | 帯域 100GB/月 | — | 既存 |
| ドメイン | お名前.com / Cloudflare Registrar | — | **¥100-170/月**（¥1,200-2,000/年） | D10 採用、唯一の固定費 |
| 計測 | Google Analytics 4 | 無制限 | — | T-P0-003 |
| Search Console | Google | 無制限 | — | T-P0-003 |
| 広告 | Google AdSense | 無制限 | — | 既存 |
| 問い合わせフォーム | **Web3Forms** 推奨 / Formspree 代替 | Web3Forms 無制限 / Formspree 月50件 | — | T-P0-002（Web3Formsを第一候補に変更） |
| メール配信 | **Mailerlite** 推奨 / Buttondown 代替 | Mailerlite 1,000人・月12,000通 / Buttondown 100人 | Mailerlite 1,001人〜$10/月 | T-P2-205。1,000人到達でPhase 2 Gate 達成、その時点で売上発生済み想定 |
| 認証 | Supabase Auth | 50,000 MAU | $25/月（Pro） | T-P3-302。Phase 3 凍結ゲート対象 |
| DB / Storage | Supabase | DB 500MB / Storage 1GB / 帯域 5GB | $25/月 | 同上 |
| 決済 | Stripe | 固定費なし | 売上の3.6% + ¥0/件 | T-P3-304。売上連動のみ |
| AI 推論 | Anthropic API | なし | 従量 | **要厳格レート制限**。詳細 §7.1.3 |
| エラー監視 | Sentry | 5,000 events/月 | $26/月 | 任意。当面入れない |
| OGP画像生成 | 自前 SVG / Canva 無料 | — | — | T-P1-107 |

### 7.1.2 採用しないサービス（コスト超過リスク）

| 不採用 | 理由 | 代替 |
|---|---|---|
| Vercel Pro / Netlify Pro | $20/月 | GitHub Pages 維持 |
| Cloudflare Workers Paid | $5/月最低 | Supabase Edge Functions（無料枠内）|
| ConvertKit | $9-25/月 | Mailerlite 無料枠 |
| Sentry Team | $26/月 | console.error + GA4 例外イベント |
| Hotjar / Microsoft Clarity Pro | — | Microsoft Clarity 無料版で代替（任意） |
| 有料 PDF ライブラリ | — | jsPDF + html2canvas（OSS） |

### 7.1.3 AI 推論コスト管理（T-P3-307 が Gate 通過時のみ）

Claude haiku 4.5 想定単価: 入力 $0.80/Mtok、出力 $4/Mtok。樹木診断1回あたり ~3Ktok（入力）+ ~1Ktok（出力）= **約 ¥1.0/枚**。

- **無料ユーザー: 月3枚 = ¥3/人 × 1,000人 = ¥3,000/月**（Gate 通過後の想定 MRR ¥150,000 の 2%）
- **Pro ユーザー: 月50枚 = ¥50/人**（サブスク内に含む）
- **超過分はリクエスト拒否**（Edge Function でカウント、Supabase に記録）
- **プロンプトキャッシュ必須**（system プロンプト・樹木医ナレッジを cache_control し、入力コスト 90% 削減）
- **Gate G1-G7 通過＋月次予算上限 ¥10,000 設定 + Anthropic 課金アラート設定** が起動条件

### 7.1.4 コスト監視チェックリスト（毎月1日に raitopapa が確認）

- [ ] ドメイン更新月確認（年1回 ¥1,200-2,000）
- [ ] Mailerlite 購読者数（1,000人接近時に告知）
- [ ] Supabase 使用量（DB/Storage/帯域）
- [ ] Anthropic API 使用量（Phase 4 開始後）
- [ ] AdSense・アフィリエイト振込予定
- [ ] 上記合計が ¥500/月を超える兆候があれば即 STATUS.md にアラート追記

---

## 8. 意思決定事項（v1.2: raitopapa 最終承認済み）

| # | 論点 | 確定内容 |
|---|---|---|
| D1 | ターゲット転換 | ✅ **確定**: 庭木オーナー＋造園業者を主軸、樹木医は「監修・権威付け」に回す |
| D2 | 価格帯 ¥480/¥1,980/¥9,800 | ⏸ **保留（Gate通過時に確定）**: Phase 1-2 の CVR 確認後に Gate 通過時点で確定 |
| D3 | 写真AI診断 | ⏸ **保留（Phase 4 扱い）**: 責任リスク回避のため初期は「AI所見補助・専門家確認必須」に限定。コスト上限内で運用（§7.1.3） |
| D4 | ブランド名 | ⏸ **保留（D5連動）**: 「樹木医ツール」継続を当面の正、サブブランド検討は監修者公開後 |
| D5 | 監修者の実名・略歴公開 | ✅ **確定（段階公開）**: 第1段階「資格・経験・監修ポリシー」匿名公開、第2段階で実名へ |
| D6 | Pro PDF への監修印 | ⏸ **保留（D5第2段階後）**: 責任範囲・名義を明文化してから |
| D7 | TRAQ/CTLA の扱い | ✅ **確定**: 削除しない。「準拠」→「参考・補助」に表現を弱める。AdSense 配置追加（T-P1-103） |
| D8 | ブログ記事執筆 | ✅ **確定**: AI下書き → 人間レビュー → 樹木医監修。外注は売上が立ってから |
| D9 | ホスティング | ✅ **確定**: GitHub Pages 維持。Phase 3 Gate 通過時点で再評価 |
| D10 | 独自ドメイン | ✅ **確定**: Phase 1 早期に取得。固定費 ¥100-170/月（§7.1）。ドメイン候補は別タスクで raitopapa が選定 |

**未決定（Gate 通過時 or 段階達成時に確定）**: D2、D3、D4、D6
**追加判断**: docs 統合は Codex 担当として確定（§12）
**コスト制約（v1.2 追加）**: ¥500/月以下を厳守（§7.1）

---

## 9. Sonnet × Codex ハンドオフ規約（→ `docs/HANDOFF.md` に分離して管理）

詳細は別ファイル参照。要点のみ:

- **タスク表明**: 着手前に [docs/STATUS.md](docs/STATUS.md) を更新（`status: in-progress(claude-sonnet)` 等）
- **ブランチ命名**: `task/T-P1-101-extract-layout`（タスクID＋短い英語）
- **PR タイトル**: `[T-P1-101] Extract common layout partials`
- **コミットメッセージ**: 既存のJP規約踏襲（`feat:`, `fix:`, `docs:`, `refactor:`）
- **競合回避**: 同一タスクを両者が同時に表明したら、後発が即座に別タスクへ譲歩
- **ファイル衝突**: 大ファイル（survey.html等）に複数タスクが触れる時は時系列順、各PRをマージしてから次着手
- **コード規約**: ADR-02 準拠（Vanilla JS、フレームワーク不可）
- **テスト**: ユニットテストは導入しない。動作確認は `python -m http.server 8080` で目視 + Lighthouse スコア
- **完了条件**: 受け入れ基準を満たし、Lighthouse スコア低下なし、リンク切れ無し、i18n両言語動作

---

## 10. 関連ドキュメント

- [docs/HANDOFF.md](docs/HANDOFF.md) — Sonnet × Codex 共同開発プロトコル
- [docs/STATUS.md](docs/STATUS.md) — タスク進捗ボード
- [docs/CONTENT_PLAN.md](docs/CONTENT_PLAN.md) — Phase 2 ブログ記事リスト（執筆時に作成）
- [README.md](README.md) — ユーザー向け概要

---

## 11. 意思決定ログ

| 日付 | 決定 | 提案 | 採否 | 出典 |
|---|---|---|---|---|
| 2026-05-03 | D1 採用 — ターゲット転換 | Claude Opus | Codex 同意 → 仮確定 | 本SPEC §8 |
| 2026-05-03 | D2 保留（Gate後確定） | Claude Opus | Codex 仮承認 | 本SPEC §4.5, §8 |
| 2026-05-03 | D3 Phase 4 へ繰下げ | Claude Opus | Codex 保留 → 採用 | 本SPEC §8 |
| 2026-05-03 | D5 段階的公開 | Codex 改善案 | 採用（Gate G6に組込） | 本SPEC §4.5, §8 |
| 2026-05-03 | D7 表現弱体化（削除せず） | Codex 改善案 | 採用 | 本SPEC §8 |
| 2026-05-03 | D10 独自ドメイン取得 | Claude+Codex | 採用（Gate G7に組込） | 本SPEC §4.5, §8 |
| 2026-05-03 | Phase 3 凍結ゲート導入 | Codex 提案 | 採用（§4.5 新設） | 本SPEC §4.5 |
| 2026-05-03 | Sonnet 初動は T-P0-001/002/003 のみ | Codex 提案 | 採用 | 本SPEC §8, STATUS.md |
| 2026-05-03 | D1-D10 仮決定 → 最終確定 | raitopapa 承認 | **D1/D5/D7/D8/D9/D10 確定、D2/D3/D4/D6 はゲート時保留継続** | 本SPEC §8 |
| 2026-05-03 | 本体 docs/ 統合は Codex 担当 | raitopapa 指示 | 採用 | 本SPEC §12 |
| 2026-05-03 | コスト上限 ¥500/月 を強制制約 | raitopapa 指示 | 採用、§7.1 新設 | 本SPEC §7.1 |

未決事項: D2（価格帯）・D3（AI診断）・D4（ブランド名）・D6（監修印）— いずれも Phase 3 ゲート通過 or D5 第2段階達成後に確定

---

## 12. 本体 docs/ との統合方針

**現状の不整合**:
- 本worktree (`peaceful-mahavira-7d621d`) の `docs/` に Claude Opus 版（v1.1）の SPEC.md / HANDOFF.md / STATUS.md
- 本体ローカル（worktree 外、`raitopapa.github.io/docs/`）に Codex 版の簡易 SPEC.md / HANDOFF_LOG.md（未push、worktree からは可視できない）

**統合担当: Codex（raitopapa が指示・2026-05-03 確定）**

統合タスク `T-DOCS-001` を Codex がローカル本体で実行:

```
1. main に checkout（raitopapa の本体作業ディレクトリ）
2. 本 worktree からドキュメントを取り込む:
   git fetch origin claude/peaceful-mahavira-7d621d
   git checkout origin/claude/peaceful-mahavira-7d621d -- docs/SPEC.md docs/HANDOFF.md docs/STATUS.md
3. Codex 版の既存 docs/SPEC.md は Claude v1.2 で上書きされる前提。
   Codex 独自の見解・コメントがあれば docs/CODEX_NOTES.md として保全
4. 既存 docs/HANDOFF_LOG.md は HANDOFF.md と統合（履歴セクションに編入）or アーカイブ
5. コミット例: docs(spec): adopt Claude v1.2 spec with raitopapa-approved D1-D10 and ¥500/mo cost cap
6. push origin main
7. STATUS.md の T-DOCS-001 を done に更新
```

**今後のドキュメント編集ルール**:
- SPEC.md / HANDOFF.md / STATUS.md は **正本を main に置く**。worktree では parent の最新を pull してから編集。
- Codex/Sonnet どちらも編集前に main を pull、編集後は本ファイル §改訂履歴 にエントリ追加
