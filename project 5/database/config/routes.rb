Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :users
  resources :purchases
  resources :videos

  # post 'signin', to: 'users#sign_in'
  # get 'validate', to: 'users#validate'
  # get 'items', to: 'users#get_items'
end
