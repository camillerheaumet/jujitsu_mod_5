Rails.application.routes.draw do
  # For details on the DSL available within this file, see http://guides.rubyonrails.org/routing.html
  resources :users
  resources :purchases do 
    member do
      post 'checkout'
    end
  end
  resources :payments, only: [:new, :create]
  resources :videos

   post 'signin', to: 'users#sign_in'
   get 'validate', to: 'users#validate'
   get 'user_videos', to: 'purchases#user_purchases'
end
