class VideosController < ApplicationController
    before_action :set_video, only: [:show, :edit, :update, :destroy]

    def index
        @videos = Video.all
        render json: @videos
    end

    def show
        render json: @video
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
        render json: {error: @video.errors.full_messages}
        end
    end

    def edit
        render json: @video
    end

    def update
        @video.update(video_params)
        if @video.valid?
            render json: @video
        else
            render json: {errors: @video.errors.full_messages}
        end
    end

    def destroy
        @video.destroy
        render json: {message:'Video deleted successfully'}
    end

    private
    def video_params
        params.require(:video).permit(:name, :price, :description, :image_url, :download_url)
    end

    def set_video
        @video = Video.find(params[:id])
    end
end
