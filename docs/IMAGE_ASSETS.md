# 樹木ナビ 写真素材ガイド

写真素材が届いたらすぐデザインへ反映できるよう、配置先と採用基準を先に固定します。

## 推奨する最初の素材

| 用途 | 枚数 | 推奨内容 | ファイル例 |
|---|---:|---|---|
| トップヒーロー | 1-3 | 公園樹、街路樹、樹冠、幹と葉。文字を重ねるため余白がある横長写真 | `assets/images/hero/hero-tree-canopy.webp` |
| 病害虫確認カード | 1 | 葉、幹肌、病斑の雰囲気が分かる写真。症状断定に見えないもの | `assets/images/tools/tool-diagnosis-leaf.webp` |
| 剪定カレンダーカード | 1 | 枝、剪定ばさみ、高枝切りばさみ、剪定前後の枝ぶり | `assets/images/tools/tool-pruning-branches.webp` |
| 健全度チェックカード | 1 | 街路樹、公園樹、根元、支柱、点検風景 | `assets/images/tools/tool-checklist-street-tree.webp` |
| 活用対象セクション | 3 | 自治体・公園管理、ホームオーナー、造園・緑化業者を想起できる写真 | `assets/images/use-cases/use-civic-street-trees.webp` |
| ブログ記事 | 任意 | 記事テーマ別の葉、枝、幹、根元、害虫、キノコ、台風後の点検など | `assets/images/blog/blog-deadwood-check.webp` |

## 採用基準

- 自前写真を第一候補にする。
- 人物の顔、車のナンバー、表札、住宅住所、店舗名、学校名などが写らないものを使う。
- 私有地や個人宅の庭木は、権利・許可が明確なものだけ使う。
- 危険木・病害虫の写真は「診断結果の保証」に見えないよう、説明文を慎重にする。
- 日本の街路樹・公園樹・庭木の文脈に合う写真を優先する。

## 画像サイズ

| 用途 | 推奨サイズ | 形式 |
|---|---:|---|
| ヒーロー背景 | 2000 x 1200px 前後 | WebP, fallback JPEG |
| カードサムネイル | 900 x 600px 前後 | WebP |
| ブログメイン画像 | 1200 x 800px 前後 | WebP |

## 実装時の差し込み先

`assets/css/tokens.css` に画像用フックを用意済みです。素材確定後に `none` を `url(...)` へ差し替えます。

```css
--image-hero-home: url('../images/hero/hero-tree-canopy.webp');
--image-tool-diagnosis: url('../images/tools/tool-diagnosis-leaf.webp');
--image-tool-pruning: url('../images/tools/tool-pruning-branches.webp');
--image-tool-checklist: url('../images/tools/tool-checklist-street-tree.webp');
```

この段階では、画像フックは未使用のため本番UIには影響しません。写真が揃ったら、トップヒーロー、ツールカード、活用対象セクションの順で段階的に反映します。
