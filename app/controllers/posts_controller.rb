class PostsController < ApplicationController

  #新しいメモが一番上に表示されるようにDESC(降順)に切替
  def index
    @posts = Post.all.order(id: "DESC")
  end

  #メモを保存した後にトップページへリダイレクト
  def create
    Post.create(content: params[:content])
    redirect_to action: :index
  end

end