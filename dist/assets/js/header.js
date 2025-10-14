// assets/js/header.js
(function () {
    // headerのパス（あなたの構成に合わせています）
    const HEADER_PATH = "/jukibu/header.html";
    const MAIN_JS_PATH = "/jukibu/assets/js/main.js";
  
    function loadScriptOnce(src, callback) {
      if (document.querySelector(`script[src="${src}"]`)) {
        if (callback) callback();
        return;
      }
      const s = document.createElement('script');
      s.src = src;
      s.async = false; // 順序を重要視
      s.onload = () => { if (callback) callback(); };
      s.onerror = () => { console.error('スクリプト読み込み失敗:', src); };
      document.body.appendChild(s);
    }
  
    // fetchしてヘッダー挿入 → main.jsを確実に読み込む
    fetch(HEADER_PATH)
      .then(response => {
        console.log("Fetch URL:", response.url);  // ← 実際にアクセスしてるURLを確認
        if (!response.ok) {
        throw new Error(`ヘッダー読み込み失敗: ${response.status}`);
        }
        return response.text();
      })
      .then(data => {
            document.body.insertAdjacentHTML('afterbegin', data);
      
        // もし main.js がまだ読み込まれていなければ読み込む（重複防止）
          loadScriptOnce(MAIN_JS_PATH);

      })

      .catch(error => {
        console.error("Error:", error);
      });
})();
  
  
