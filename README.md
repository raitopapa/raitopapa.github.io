# 🌿 樹木医ツール — Arborist Tools Japan

> **樹木医が監修した、無料の樹木管理Webツール集。**
> 病害虫の早期発見から剪定適期・現地調査・ISA準拠リスク評価・CTLA式価値算定まで。
> **Supervised by a Certified Japanese Arborist. Free to use.**

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Tools](https://img.shields.io/badge/Tools-6-brightgreen)]()
[![Species](https://img.shields.io/badge/Tree%20Species-40%2B-forestgreen)]()
[![PWA](https://img.shields.io/badge/PWA-Offline%20Ready-blueviolet)]()
[![Languages](https://img.shields.io/badge/Lang-JA%20%2F%20EN-blue)]()
[![ISA TRAQ](https://img.shields.io/badge/ISA-TRAQ%20Level%20II-darkgreen)]()
[![CTLA](https://img.shields.io/badge/CTLA-10th%20ed.-gold)]()
[![i-Tree](https://img.shields.io/badge/i--Tree-Ecosystem%20Services-teal)]()

🌐 **[サイトを見る / View Site →](https://raitopapa.github.io/)**

---

## 📋 ツール一覧 / Tool List

### 🆓 無料ツール / Free Tools

| ツール | ファイル | 概要 |
|---|---|---|
| 🦠 病害虫リスク診断 | `diagnosis.html` | 40+樹種・症状からリスクと対処法を即表示 |
| 📅 剪定適期カレンダー | `pruning.html` | 40+樹種×6目的・地域補正・年間管理カレンダー |
| 📋 樹木健全度チェックリスト | `checklist.html` | 32項目・A〜Dランク自動算出・PDF出力 |

### 🔬 プロ向けツール / Professional Tools

| Tool | File | Description |
|---|---|---|
| ⚠️ 樹木リスク評価 | `traq.html` | ISA TRAQ Level II準拠・ANSI A300 Part 9 |
| 💰 樹木価値算定 | `ctla.html` | CTLA 10th ed. + i-Tree生態系サービス計算 + QRコード |
| 🗺 現地調査記録 | `survey.html` | GPS・地図・写真記録・CSV/GeoJSON・QR・音声・履歴管理 |

---

## 🚀 主な機能 / Key Features

### ツール・診断機能
- **40+樹種対応** — 針葉樹・落葉広葉樹・常緑広葉樹・竹類・果樹
- **地域補正** — 気象庁生物季節観測（1991〜2020年平年値）に基づく北海道〜沖縄対応
- **ISA TRAQ Level II準拠** — 破損可能性×衝突可能性×結果重大性のリスクマトリクス評価
- **CTLA式樹木価値算定** — 断面積×単価×種評価率×健全度×立地評価率
- **i-Tree生態系サービス計算** — CO₂固定量・雨水抑制・大気浄化・冷却効果・生物多様性価値

### フィールドワーク（survey.html）
- **📸 写真記録** — カメラ撮影・ファイル選択→IndexedDBに永続保存・ライトボックス表示
- **🔔 メンテナンスアラート** — 次回点検期限を自動計算・バナー通知・PWAプッシュ通知対応
- **📊 点検履歴管理** — 複数回の調査を時系列で蓄積・リスク推移を一覧表示
- **GPS位置記録** — Geolocation API（精度表示付き）
- **地図レイヤー切替** — 標準・国土地理院地形図（等高線）・Esri衛星画像・白地図（全て無料）
- **ピン手動配置** — GPS不良時に地図タップで位置を手動指定
- **CSV台帳出力** — Excel対応・BOM付き（GPS座標列込み）
- **GeoJSON出力** — QGIS・ArcGIS・Google Earth対応（WGS84 EPSG:4326）
- **QRコード生成** — 樹木ごとにQRを生成・PNG保存・現地貼付用
- **IndexedDB永続保存** — ページを閉じてもデータを保持・次回調査へ引き継ぎ
- **音声入力** — Web Speech API（所見欄・Chrome対応）
- **ダークモード** — 屋外の強い日差し対応・高コントラスト・設定を記憶
- **樹種サジェスト** — 入力時に候補を自動表示（50+種）
- **オフライン対応** — 電波のない現場でも完全動作

### UX・技術
- **PWA対応** — オフライン動作・ホーム画面インストール
- **JA/EN 言語切替** — 全7ページ完全対応・ブラウザ言語自動検出
- **PDF出力** — 全ツールの結果を印刷・PDF保存
- **SEO対応** — OGP / Twitter Card / JSON-LD構造化データ / sitemap.xml
- **出典明示** — 農林水産省・国交省・ISA・CTLA等の一次資料を全ツールに明示

---

## 🏗 技術スタック / Tech Stack

| 項目 | 詳細 |
|---|---|
| フロントエンド | HTML / CSS / Vanilla JavaScript のみ |
| 地図 | Leaflet.js + OpenStreetMap / 国土地理院 / Esri（全て無料） |
| QRコード | QRCode.js（クライアントサイド生成） |
| ストレージ | IndexedDB（surveys・photos・historyの3ストア） |
| 写真保存 | Base64 → IndexedDB（サーバー不要・完全ローカル） |
| PWA | Service Worker + Web App Manifest |
| ホスティング | GitHub Pages（静的配信） |
| SEO | OGP / Twitter Card / JSON-LD / sitemap.xml / robots.txt |

---

## 📁 ファイル構成 / File Structure

```
raitopapa.github.io/
├── index.html          # トップページ
├── diagnosis.html      # 病害虫リスク診断
├── pruning.html        # 剪定適期カレンダー
├── checklist.html      # 樹木健全度チェックリスト
├── traq.html           # ISA TRAQ リスク評価（Pro）
├── ctla.html           # CTLA + i-Tree 価値算定（Pro）
├── survey.html         # 現地調査・GPS・地図・写真・履歴（Pro）
├── privacy.html        # プライバシーポリシー
├── contact.html        # お問い合わせ
├── sitemap.xml         # サイトマップ（SEO）
├── robots.txt          # クローラー設定
├── _config.yml         # GitHub Pages設定
├── manifest.json       # PWA マニフェスト
├── sw.js               # Service Worker
├── icons/
│   ├── icon-192.png
│   └── icon-512.png
└── README.md
```

---

## 📚 情報ソース・根拠 / References

| 機関 | 資料 |
|---|---|
| 農林水産省 | 病害虫防除所情報・マツ材線虫病防除指針 |
| 森林総合研究所 | ナラ枯れ被害の現状と防除技術 |
| 国土交通省 | 街路樹の点検・診断指針（2019年） |
| 気象庁 | 生物季節観測 さくら開花平年日（1991〜2020年） |
| ISA（国際樹木学会） | TRAQ Program Guide（2025年改訂）・ANSI A300 Part 9 |
| CTLA | Guide for Plant Appraisal 10th edition |
| USDA Forest Service | i-Tree Eco — Ecosystem services calculation |
| Nowak & Crane (2002) | Carbon storage and sequestration by urban trees |
| Nowak et al. (2006) | Air pollution removal by urban trees |
| TEEB | The Economics of Ecosystems and Biodiversity — Urban |
| 日本樹木医会 | 樹木医学テキスト |
| 日本植物病理学会 | 日本植物病名目録 |
| 環境省 | 特定外来生物（クビアカツヤカミキリ等）防除情報 |

---

## 🌱 ローカルで動かす / Running Locally

```bash
git clone https://github.com/raitopapa/raitopapa.github.io.git
cd raitopapa.github.io
# Service Worker・IndexedDB・GPS のテストには localhost が必要
python3 -m http.server 8080
# → http://localhost:8080 で開く
```

---

## 🤝 コントリビュート / Contributing

```bash
git checkout -b feature/add-new-species
git commit -m "feat: ○○の病害虫データを追加"
git push origin feature/add-new-species
# → Pull Request を作成
```

### 優先コントリビュート
- [ ] 対応樹種のさらなる拡充（現在40+種）
- [ ] 多言語対応（韓国語・繁体字中国語・ドイツ語）
- [ ] i-Tree係数の日本地域別精度向上
- [ ] 写真のGPSジオタグ読み取り（EXIF対応）

---

## 📜 License

[MIT License](LICENSE)

---

## 👤 Credits

- **樹木医監修:** 樹木医資格保有者
- **開発:** [@raitopapa](https://github.com/raitopapa)

---

## 📊 Roadmap

```
v1.0  ✅ 3ツール公開（診断・カレンダー・チェックリスト）
v1.2  ✅ 40+樹種対応
v1.3  ✅ PDF出力
v2.0  ✅ PWA化（オフライン対応）
v2.1  ✅ 出典・根拠セクション（E-E-A-T対応）
v2.2  ✅ 地域補正（気象庁データ基準）
v2.3  ✅ プロ向けツール3本（TRAQ・CTLA・複数樹木調査）
v2.4  ✅ JA/EN 言語切替（全7ページ完全対応）
v2.5  ✅ GPS・地図（Leaflet）・CSV/GeoJSON出力
v2.6  ✅ 地図レイヤー切替（地形図・衛星・白地図）
v2.7  ✅ IndexedDB永続保存・ピン手動配置・ダークモード・音声入力
v2.8  ✅ i-Tree生態系サービス計算・QRコード生成
v2.9  ✅ OGP/Twitter Card/JSON-LD/sitemap.xml（SEO強化）
v3.0  ✅ 写真記録（IndexedDB）・メンテナンスアラート・点検履歴管理
v3.1  🔲 多言語対応（韓国語・繁体字中国語・ドイツ語）
v3.2  🔲 Google Analytics設置（アクセス解析）
v3.3  🔲 写真のGPSジオタグ読み取り（EXIF対応）
v3.4  🔲 写真添付AI診断（Claude API）
```
