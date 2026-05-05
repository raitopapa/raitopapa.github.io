# 樹木管理ナビ — Tree Management Navi

庭木・街路樹・公園樹の管理を支援する、樹木医監修の無料Webツール集です。病害虫の初期確認、剪定適期、健全度チェック、現地調査記録、樹木リスク評価、樹木価値算定をブラウザだけで利用できます。

[サイトを見る](https://raitopapa.github.io/)

[![License: MIT](https://img.shields.io/badge/License-MIT-green.svg)](LICENSE)
[![Tools](https://img.shields.io/badge/Tools-6-brightgreen)]()
[![Species](https://img.shields.io/badge/Tree%20Species-40%2B-forestgreen)]()
[![PWA](https://img.shields.io/badge/PWA-Offline%20Ready-blueviolet)]()
[![Languages](https://img.shields.io/badge/Lang-JA%20%2F%20EN-blue)]()

## 現在の状態

- Phase 0: 緊急修正完了
- Phase 1: 広告・計測・SEO・共通化まわり完了
- Phase 2: ブログ基盤、25記事、用語集、内部リンク、メール購読導線まで完了
- Phase 3: 需要検証ゲート通過まで凍結
- 写真素材: 受け入れフォルダとガイドを準備済み。実画像のデザイン反映は素材到着後

詳細な仕様と進捗は [docs/SPEC.md](docs/SPEC.md) と [docs/STATUS.md](docs/STATUS.md) を参照してください。

## ツール一覧

| 区分 | ツール | ファイル | 概要 |
|---|---|---|---|
| 無料 | 病害虫リスク診断 | [diagnosis.html](diagnosis.html) | 樹種・季節・症状から疑われる病害虫と初期対応を表示 |
| 無料 | 剪定適期カレンダー | [pruning.html](pruning.html) | 樹種と目的に応じた剪定時期を月別に確認 |
| 無料 | 樹木健全度チェックリスト | [checklist.html](checklist.html) | 32項目の現地チェックとA-Dランク評価 |
| Pro向け | 樹木リスク評価 | [traq.html](traq.html) | ISA TRAQ / ANSI A300 Part 9 を参考にした補助評価 |
| Pro向け | 樹木価値算定 | [ctla.html](ctla.html) | CTLA 10th ed. を参考にした価値算定補助 |
| Pro向け | 現地調査記録 | [survey.html](survey.html) | GPS、地図、写真、CSV/GeoJSON、QR、履歴管理 |

## 主な機能

- 40+樹種対応
- 日本語/英語の切り替え
- PWA対応とオフライン利用
- Google Analytics 4 / Search Console
- Google AdSense 導線
- Amazonアフィリエイト導線
- MailerLite 季節リマインダー購読導線
- Web3Forms 問い合わせフォーム
- ブログ記事25本と樹木用語集
- 内部リンク自動表示
- OGP / Twitter Card / JSON-LD / sitemap.xml
- IndexedDBによるローカル保存

## 現地調査機能

[survey.html](survey.html) は、現場で複数樹木を連続記録するためのツールです。

- GPS位置記録
- OpenStreetMap / 国土地理院地形図 / Esri衛星画像 / 白地図
- GPS不良時の地図タップによる手動ピン配置
- 写真撮影・ファイル選択・IndexedDB保存
- 点検履歴管理
- CSV台帳出力
- GeoJSON出力
- QRコード生成
- 音声入力
- ダークモード

写真・入力内容はサーバーへ送信せず、ブラウザ内に保存します。

## 技術構成

| 項目 | 内容 |
|---|---|
| フロントエンド | HTML / CSS / Vanilla JavaScript |
| ホスティング | GitHub Pages |
| 地図 | Leaflet.js + OpenStreetMap / 国土地理院 / Esri |
| 保存 | IndexedDB |
| PWA | Service Worker + Web App Manifest |
| 問い合わせ | Web3Forms |
| メール | MailerLite hosted form |
| 計測 | GA4 / Search Console |
| 広告 | Google AdSense |
| アフィリエイト | Amazon Associates |

## ディレクトリ構成

```text
raitopapa.github.io/
├── index.html
├── diagnosis.html
├── pruning.html
├── checklist.html
├── traq.html
├── ctla.html
├── survey.html
├── glossary/
│   └── index.html
├── contact.html
├── privacy.html
├── blog/
├── _posts/
├── _layouts/
├── _includes/
├── assets/
│   ├── css/
│   ├── js/
│   ├── i18n/
│   ├── data/
│   ├── images/
│   └── partials/
├── docs/
├── icons/
├── manifest.json
├── sw.js
├── sitemap.xml
└── robots.txt
```

## ローカル確認

Service Worker、IndexedDB、GPS、カメラ入力の確認にはローカルHTTPサーバーを使ってください。

```bash
git clone https://github.com/raitopapa/raitopapa.github.io.git
cd raitopapa.github.io
python -m http.server 8080
```

ブラウザで `http://localhost:8080` を開きます。

## 運用ルール

- 1タスク = 1ブランチ = 1PR
- 進捗管理は [docs/STATUS.md](docs/STATUS.md)
- 仕様は [docs/SPEC.md](docs/SPEC.md)
- 共同開発手順は [docs/HANDOFF.md](docs/HANDOFF.md)
- UX方針は [docs/UX_PLAN.md](docs/UX_PLAN.md)
- 写真素材方針は [docs/IMAGE_ASSETS.md](docs/IMAGE_ASSETS.md)

## 残課題

### 人間側の作業

- 独自ドメインの取得
- 監修者プロフィール匿名版の本文作成
- 写真素材の用意
- MailerLite フォーム名の確認・必要に応じた修正

### 実装候補

- T-UX-503: サーフェス階層トークンの整理
- 写真素材をトップヒーロー・カード・活用対象セクションへ反映
- use-case / footer などに残る絵文字表現の整理
- README / STATUS の進捗同期自動化
- カメラ・GPS・PWAの実機確認結果を docs に記録

### 凍結中

Phase 3 の Supabase、Stripe、認証、クラウド同期、AI診断、法人プランは、需要検証ゲート通過まで着手しません。

## 参考資料

- 農林水産省 病害虫防除所情報
- 森林総合研究所 ナラ枯れ被害の現状と防除技術
- 国土交通省 街路樹の点検・診断指針
- 気象庁 生物季節観測
- ISA TRAQ Program Guide / ANSI A300 Part 9
- CTLA Guide for Plant Appraisal 10th edition
- USDA Forest Service i-Tree
- 日本樹木医会 樹木医学関連資料
- 日本植物病理学会 日本植物病名目録

## License

[MIT License](LICENSE)

## Credits

- 監修: 樹木医資格保有者
- 開発: [@raitopapa](https://github.com/raitopapa)
