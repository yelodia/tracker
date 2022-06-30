Rails.application.routes.draw do
  devise_for :users
  root to: 'home#index'
  resources :tasks, only: [:index, :new, :create, :update] do
    get '/delete', to: 'tasks#delete'
  end
end
