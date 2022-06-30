Rails.application.routes.draw do
  devise_for :users, controllers: {
    passwords: 'users/passwords'
  }
  root to: 'home#index'
  resources :tasks, only: [:index, :new, :create] do
    put '/set_status', to: 'tasks#set_status'
    put '/approve', to: 'tasks#approve'
  end
end
