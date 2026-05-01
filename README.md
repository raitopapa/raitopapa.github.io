# 🌿 樹木医ツール — Arborist Tools Japan

> **樹木医が監修した、無料の樹木管理Webツール集。**  
> 病害虫の早期発見・剪定適期の判断・現地健全度調査・ISA準拠リスク評価・CTLA式樹木価値算定をブラウザから即座に実行できます。  
> **Supervised by a Certified Japanese Arborist (樹木医). Free to use.**

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Tools](https://img.shields.io/badge/Tools-6-brightgreen)]()
[![Species](https://img.shields.io/badge/Tree%20Species-40%2B-forestgreen)]()
[![PWA](https://img.shields.io/badge/PWA-Offline%20Ready-blueviolet)]()
[![Languages](https://img.shields.io/badge/Lang-JA%20%2F%20EN-blue)]()
[![ISA TRAQ](https://img.shields.io/badge/ISA-TRAQ%20Level%20II-darkgreen)]()
[![CTLA](https://img.shields.io/badge/CTLA-10th%20ed.-gold)]()

🌐 **[サイトを見る / View Site →](https://raitopapa.github.io/)**

---

## 📋 ツール一覧 / Tool List

### 🆓 無料ツール / Free Tools

| ツール | ファイル | 概要 |
|---|---|---|
| 🦠 病害虫リスク診断 | `diagnosis.html` | 40+樹種・症状からリスクと対処法を即表示 |
| 📅 剪定適期カレンダー | `pruning.html` | 40+樹種×6目的の月別剪定適否・地域補正・年間管理カレンダー |
| 📋 樹木健全度チェックリスト | `checklist.html` | 32項目の現地調査シート・A〜Dランク自動算出・PDF出力 |

### 🔬 プロ向けツール / Professional Tools

| Tool | File | Description |
|---|---|---|
| ⚠️ 樹木リスク評価 | `traq.html` | ISA TRAQ Level II準拠・ANSI A300 Part 9対応・リスクマトリクス判定 |
| 💰 樹木価値算定 | `ctla.html` | CTLA Guide for Plant Appraisal 10th ed. 準拠・移植補償・保険査定対応 |
| 🗺 現地調査記録 | `survey.html` | 複数樹木の一括記録・リスク別集計・調査レポート自動生成 |

---

## 🚀 主な機能 / Features

- **40+樹種対応** — 針葉樹・落葉広葉樹・常緑広葉樹・竹類・果樹など
- **地域補正** — 気象庁「生物季節観測」1991〜2020年平年値に基づく北海道〜沖縄対応
- **ISA TRAQ Level II準拠** — 破損可能性・衝突可能性・結果重大性をリスクマトリクスで評価
- **CTLA式樹木価値算定** — 断面積×基本単価×種評価率×健全度×立地評価率でリアルタイム計算
- **PWA対応** — オフラインでも動作・スマートフォンのホーム画面に追加可能
- **PDF出力** — 全ツールの結果を印刷・PDF保存対応
- **JA / EN 言語切替** — ブラウザ言語を自動検出、1クリックで切替
- **出典明示** — 農林水産省・国土交通省・ISA・CTLA等の一次資料を全ツールに明示

---

## 🏗 技術スタック / Tech Stack

| 項目 | 詳細 |
|---|---|
| フロントエンド | HTML / CSS / Vanilla JavaScript のみ |
| 依存ライブラリ | なし（Google Fontsのみ） |
| ビルドツール | 不要 |
| ホスティング | GitHub Pages（静的配信） |
| PWA | Service Worker + Web App Manifest |
| オフライン戦略 | Cache First（Stale-While-Revalidate） |

全ロジックはクライアントサイドで完結。サーバー・データベース不要です。

---

## 📁 ファイル構成 / File Structure

```
raitopapa.github.io/
├── index.html          # トップページ
├── diagnosis.html      # 病害虫リスク診断（40+樹種）
├── pruning.html        # 剪定適期カレンダー（地域補正・年間カレンダー）
├── checklist.html      # 樹木健全度チェックリスト（32項目）
├── traq.html           # 樹木リスク評価（ISA TRAQ Level II準拠）
├── ctla.html           # 樹木価値算定（CTLA式）
├── survey.html         # 現地調査・複数樹木記録
├── privacy.html        # プライバシーポリシー
├── contact.html        # お問い合わせ
├── manifest.json       # Web App Manifest（PWA）
├── sw.js               # Service Worker（オフライン対応）
├── icons/
│   ├── icon-192.png
│   └── icon-512.png
└── README.md
```

---

## 🌱 ローカルで動かす / Running Locally

ビルド不要です。クローン後にHTMLファイルをブラウザで開くだけで動作します。

```bash
git clone https://github.com/raitopapa/raitopapa.github.io.git
cd raitopapa.github.io
open index.html        # macOS
start index.html       # Windows
xdg-open index.html   # Linux
```

> **Note:** Service Worker（PWA）はHTTPSまたはlocalhostでのみ動作します。  
> ローカルでPWAをテストする場合は `python3 -m http.server` 等を使用してください。

---

## 📚 情報ソース・根拠 / References

| 機関 | 資料 |
|---|---|
| 農林水産省 | 病害虫防除所情報・マツ材線虫病防除指針 |
| 森林総合研究所 | ナラ枯れ被害の現状と防除技術 |
| 国土交通省 | 街路樹の点検・診断指針（2019年） |
| 気象庁 | 生物季節観測 さくら開花平年日（1991〜2020年平年値）|
| ISA（国際樹木学会） | TRAQ Program Guide（2025年改訂）・ANSI A300 Part 9 |
| CTLA | Guide for Plant Appraisal 10th edition |
| 日本樹木医会 | 樹木医学テキスト |
| 日本植物病理学会 | 日本植物病名目録 |
| 環境省 | 特定外来生物（クビアカツヤカミキリ等）防除情報 |

---

## 🤝 コントリビュート / Contributing

```bash
git checkout -b feature/add-new-species
git commit -m "feat: ○○の病害虫データを追加"
git push origin feature/add-new-species
# → Pull Request を作成
```

### データ構造（diagnosis.html）

```javascript
newTree: {
  "leaf-yellow,branch-dead": {
    risk: "high",          // "high" | "mid" | "low"
    title: "○○の診断結果",
    pests: [
      { name: "病害虫名", desc: "症状の説明。" }
    ],
    actions: ["対処法1", "対処法2"],
    caution: "注意事項。"
  }
}
```

---

## 🐛 Issues

[GitHub Issues](https://github.com/raitopapa/raitopapa.github.io/issues) からお気軽にどうぞ。

---

## 📜 License

[MIT License](LICENSE) — 商用・非商用問わず自由に使用・改変・再配布できます。

---

## 👤 Credits

- **樹木医監修:** 樹木医資格保有者
- **開発:** [@raitopapa](https://github.com/raitopapa)

---

## 📊 Roadmap

```
v1.0  ✅ 3ツール公開（診断・カレンダー・チェックリスト）
v1.1  ✅ プライバシーポリシー・お問い合わせ
v1.2  ✅ 対応樹種を40+種へ拡充
v1.3  ✅ PDF・印刷出力機能
v2.0  ✅ PWA化（オフライン対応）
v2.1  ✅ 出典・根拠セクション（E-E-A-T対応）
v2.2  ✅ 地域補正（気象庁データ基準）
v2.3  ✅ プロ向けツール3本（TRAQ・CTLA・複数樹木調査）
v2.4  ✅ JA / EN 言語切替
v3.0  🔲 GPS位置記録
v3.1  🔲 多言語対応（韓国語・繁体字中国語・ドイツ語）
v3.2  🔲 写真添付AI診断（Claude API）
```
