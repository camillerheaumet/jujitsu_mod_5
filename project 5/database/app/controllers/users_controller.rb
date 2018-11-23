class UsersController < ApplicationController
    before_action :set_user, only: [:show, :edit, :update] # :destroy peut etre plus tard

    def index
        @users = User.all
        render json: @users
    end

    def show
    end

    def sign_in
        user = User.find_by(email: params[:email])
        if user && user.authenticate(params[:password])
          render json: {email: user.email, token: issue_token({id: user.id})}
        else
          render json: {error: 'Invalid email/password combination.'}, status: 400
        end
      end
    
      def validate
        user = get_current_user
        if user
          render json: {email: user.email, token: issue_token({id: user.id})}
        else
          render json: {error: 'User not found.'}, status: 400
        end
      end
    
    #   def get_items
    #     user = get_current_user
    #     if user
    #       render json: user.items
    #     else
    #       render json: {error: 'You are not signed in.'} 
    #     end  
    #   end

    def new
        @user = User.new
        render json: @user
    end

    def create
        @user = User.new(user_params)
        if @user.save
        render json: @user
        else
        render json: {error: 'This user already exists'}
        end
    end

    def edit
    render json: @user
    end

    def update

        # quelquechoses
    end

    #   def destroy
    #     @user.destroy
    #     render json: {message:'Store deleted successfully'}
    #     # on verra plus tard si ca me tente de permettre de supprimer son account
    #   end

    private
    def user_params
        params.require(:user).permit(:name, :email, :password)
    end

    def set_user
        @user = User.find(params[:id])
    end
end
