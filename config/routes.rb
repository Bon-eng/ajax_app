Rails.application.routes.draw do
  #posts#indexへのパスをトップページへ変更、ajaxのため投稿完了ページは削除した
  root to: 'posts#index'
  post 'posts', to: 'posts#create'
end