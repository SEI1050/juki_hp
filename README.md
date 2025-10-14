edit_jukibuで編集
変更をHPで反映させる場合
  edit_jukibuでの変更内容をdistにcpなどで移す
  git add ~
  git commit -m "あとで見返して何を変更したのかわかるように一言"
  git push origin main
ファイルサーバー・HPを開いて変更が正しく反映・挙動しているか確認
エラーの場合修正、すぐにできない場合はコミットを取り消す。
  git log --oneline
  (ex)
  　a1b2c3d update footer
    d4e5f6g fixed header layout ←これが安定してた
  git revert a1b2c3d
  git push origin main
