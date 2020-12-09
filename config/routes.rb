Rails.application.routes.draw do
  #posts#indexへのパスをトップページへ変更、ajaxのため投稿完了ページは削除した
  root to: 'posts#index'
  post 'posts', to: 'posts#create'
  #メモのidを取得できるような記述、渡す情報が一意の情報なのでpathパラメーターで
  get 'posts/:id', to: 'posts#checked'
end