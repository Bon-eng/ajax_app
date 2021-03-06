class PostsController < ApplicationController

  #新しいメモが一番上に表示されるようにDESC(降順)に切替
  def index
    @posts = Post.all.order(id: "DESC")
  end

  #メモを保存した後にトップページへリダイレクト
  def create
    #メモ作成時に未読の情報を保存するようにした
    post = Post.create(content: params[:content], checked: false)
    #レスポンスをJSONに変更した
    render json:{ post: post }
  end

  def checked
    #routesから既読したメモのidが渡されるように設定するために該当レコードを取得
    post = Post.find(params[:id])
    #post.checkedという既読か否かを判定するプロパティを指定、updateはActiveRecordメソッド
    #⬇️このcheckedで返却したitemはXHR.response.postで取得できる
    if post.checked #既読であれば「既読を解除するためにfalseへ変更」
      post.update(checked: false)
    else#既読でなければ「既読にするためtrueへ変更」
      post.update(checked: true)
    end
    #更新したレコードをparamsで取得、renderでJSON形式としてchecked.jsに返却
    item = Post.find(params[:id])
    render json: { post: item }
  end
end