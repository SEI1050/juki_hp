# 🏗️ Juki HP 更新手順

このプロジェクトは、`edit_jukibu` フォルダで編集を行い、  
`dist` フォルダに反映して Git 経由で本番サイト（https://jukisapo.net）に自動デプロイされます。

---

## 🔧 編集手順

1. **編集用フォルダに移動**
   ```bash
   cd edit_jukibu
   ```

2. **HTML / CSS / JS などを編集**
   - 例: `index.html` のテキスト変更  
   - 例: `assets/css/style.css` のデザイン調整

3. **変更内容を本番反映用フォルダ（dist）にコピー**
   ```bash
   cp -r edit_jukibu/* dist/
   ```

4. **変更を Git に反映**
   ```bash
   git add .
   git commit -m "変更内容を一言で（例: fix footer layout）"
   git push origin main
   ```

5. **自動デプロイを待つ**
   - GitHub Actions により自動でサーバーへアップロードされます。
   - 数十秒〜1分ほどで [https://jukisapo.net](https://jukisapo.net) に反映されます。

6. **サイトを確認**
   - 表示や動作が正しいかをブラウザで確認。
   - 問題がある場合は修正またはロールバックします。

---

## 🧭 エラー時の対応（ロールバック）

誤った更新をすぐに戻したい場合は以下を実行します。

1. **過去のコミット履歴を確認**
   ```bash
   git log --oneline
   ```

   **例:**
   ```
   a1b2c3d update footer
   d4e5f6g fixed header layout ← これが安定していた
   ```

2. **問題のあるコミットを取り消す**
   ```bash
   git revert a1b2c3d
   git push origin main
   ```

   → 自動で再デプロイされ、安定バージョンに戻ります。

---

## 💡 運用のポイント

- `edit_jukibu` は作業用フォルダ、`dist` が本番反映フォルダです。  
- `git commit` メッセージには、**あとで見て何を変えたか分かるように**書きましょう。  
- `--force` オプションは使用しないでください。履歴破壊の原因になります。  
- 安定した状態のコミットIDはメモしておくと安心です。  

---

## 📂 フォルダ構成例

```
juki_HP/
├─ edit_jukibu/        # 編集作業用フォルダ
├─ dist/               # デプロイ対象フォルダ（自動でFTPにアップロード）
├─ .github/workflows/  # GitHub Actions 設定ファイル
└─ README.md           # このファイル
```

---

## 👥 編集メンバー向けメモ

複数人で編集する場合は、以下を守ってください：

- 変更前に最新を取得  
  ```bash
  git pull origin main
  ```
- 変更後にコミット・プッシュ  
  ```bash
  git add .
  git commit -m "更新内容"
  git push origin main
  ```
- 他メンバーの作業を上書きしないよう、こまめに push しましょう。

