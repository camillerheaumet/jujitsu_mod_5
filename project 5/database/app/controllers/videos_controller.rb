class VideosController < ApplicationController
    before_action :set_video, only: [:show, :edit, :update] # :destroy peut etre plus tard

    def index
        @videos = Video.all
        render json: @videos
    end

    def show
    end

    def new
        @video = Video.new
        render json: @video
    end

    def create
        @video = Video.new(video_params)
        if @video.save
        render json: @video
        else
        render json: {error: 'This video is not valid'}
        end
    end

    def edit
    end

    def update
        # quelquechoses
    end

    #   def destroy
    #     @video.destroy
    #     render json: {message:'Store deleted successfully'}
    #     # on verra plus tard si ca me tente de permettre de supprimer son account
    #   end

    private
    def video_params
        params.require(:video).permit(:name, :price, :description, :image_url, :download_url)
    end

    def set_video
        @video = video.find(params[:id])
    end
end
