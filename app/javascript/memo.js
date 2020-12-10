function memo() {//memo関数を定義
  const submit = document.getElementById("submit");//submit(投稿)ボタンの情報を取得
  submit.addEventListener("click", (e) => {//submitボタンをclickした時実行される関数を定義
    const formData = new FormData(document.getElementById("form"));//オブジェクト生成し引数にform要素渡し入力された値を取得
    const XHR = new XMLHttpRequest();//非同期通信を実装するために必要なオXMLブジェクトを生成
    XHR.open("POST", "/posts", true);//openメソッドを使用してリクエストの内容を引数へ追記、HTTPメソッドPOST、パス/posts、非同期通信true
    XHR.responseType = "json";//返却データがJSONになるので指定
    XHR.send(formData);//メモ投稿フォームに入力された情報を送信
    XHR.onload = () => {
      if (XHR.status != 200) {//既読機能実装と同じように200以外のHTTPステータスが返却された時の処理
        alert(`Error ${XHR.status}: ${XHR.statusText}`);//内容は全く同じ
        return null;
      }
      const item = XHR.response.post;//レスポンスとして返却されたメモのレコードデータを取得
      const list = document.getElementById("list");//描画する親要素のlistの要素を取得
      const formText = document.getElementById("content");//処理完了後(送信後)にフォームを空にしないといけないので、リセット対象要素はcontent
      //以下はメモとして描画する部分のHTMLを定義、HTMLという変数を描画する処理を行えばここで定義したHTMLが描画される
      const HTML = `
        <div class="post" data-id=${item.id}>
          <div class="post-date">
            投稿日時：${item.created_at}
          </div>
          <div class="post-content">
          ${item.content}
          </div>
        </div>`;
      list.insertAdjacentHTML("afterend", HTML);//listという要素に対しinsert〜でHTML追加、afterend指定でlist要素の直後に挿入
      formText.value = "";//メモの入力フォームをからの文字列に上書き、リセットする仕組み
    };
    e.preventDefault();//非同期通信の実装なのでsubmitボタンでclickするプログラム本来の処理を止める
  });
}
window.addEventListener("load", memo);//window(ページ)をload(読み込み)時に実行