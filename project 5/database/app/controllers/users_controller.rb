class UsersController < ApplicationController
    before_action :set_user, only: [:show, :edit, :update, :destroy]

    def index
        @users = User.all
        render json: @users
    end

    def show
        render json: @user
    end

    def sign_in
        user = User.find_by(email: params[:email])

        if user && user.authenticate(params[:password])
          render json: {id: user.id, name: user.name, email: user.email, admin: user.admin, token: issue_token({id: user.id})}
        else
          render json: {errors: 'Invalid email/password combination.'}
        end
      end
    
      def validate
        user = get_current_user
        if user
          render json: {id: user.id, name: user.name, email: user.email, admin: user.admin, token: issue_token({id: user.id})}
        else
          render json: {errors: 'User not found.'}, status: 400
        end
      end
    
      def get_videos
        user = get_current_user
        if user
          render json: user.videos
        else
          render json: {errors: 'You are not signed in.'} 
        end  
      end

    def new
        @user = User.new
        render json: @user
    end

    def create
        @user = User.new(user_params)
        if @user.save
            render json: @user
        else
            render json: {errors: @user.errors.full_messages}
        end
    end

    def edit
        render json: @user
    end

    def update
        @user.update(user_params)
        if @user.valid?
            render json: @user
        else
            render json: {errors: @user.errors.full_messages}
        end
    end

    def destroy
        @user.destroy
        render json: {message:'Your account has been deleted successfully'}
    end

    private
    def user_params
        params.require(:user).permit(:name, :email, :password)
    end

    def set_user
        @user = User.find(params[:id])
    end
end
