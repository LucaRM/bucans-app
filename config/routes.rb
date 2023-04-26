Rails.application.routes.draw do
	root "home#index"
	
	get 'home/index'
	get "/articles", to: "articles#index"
	get "/articles/:id", to: "articles#show"
end
