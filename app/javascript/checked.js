function check() {
  //index.html.erbからpostをクラス名にもつ要素をAllで全て取得(メモの数だけ存在する)
  const posts = document.querySelectorAll(".post");  //取得した要素に対しforEachで要素1つずつに対して繰り返し処理を行う
  posts.forEach(function (post) {  //addEventListenerメソッドを使用し、引数にclickの指定
    if (post.getAttribute("data-load") != null) {//❶1回目はifはスルー、❸追加属性のためnullの条件当てはまる
      return null;//❹返り値としてreturn nullで処理がストップする流れ
    }
    post.setAttribute("data-load", "true");//❷要素にdata-load = "true"と属性を追加
    post.addEventListener("click", () => {  //「要素1つずつに対して、『クリック』した際に動作するイベント駆動」を設定
      const postId = post.getAttribute("data-id");  //getAttributeでメモのid(date-id)を取得
      const XHR = new XMLHttpRequest();  //エンドポイントを呼び出すために、XMLHttpRequestを使用してHTTPリクエストを行う
      XHR.open("GET", `/posts/${postId}`, true);//XHRでのリクエストをここで記述
      XHR.responseType = "json";//レスポンスはJSON形式のデータ
      XHR.send();  //sendメソッドで設定した情報をサーバーサイドへ送信
      XHR.onload = () => {
        if (XHR.status != 200) {//statusメソッドでレスポンスがエラーだった場合の処理を記述
          alert(`Error ${XHR.status}: ${XHR.statusText}`);//200以外の場合にifはtrueとなりアラートを表示
          return null;//JavaScriptの処理から抜け出す記述、エラーが出た時にこれ以降の処理は行わない
        }
        const item = XHR.response.post;//このresponseでJSONにアクセスできる
        if (item.checked === true) {//コントローラーのcheckedアクションで帰ってきたitemがここで使用可能
          post.setAttribute("data-check", "true");
        } else if (item.checked === false) {
          post.removeAttribute("data-check");
        }
      };
    });
  });
}
setInterval(check, 1000);//1秒に1回ごとにcheckを実行