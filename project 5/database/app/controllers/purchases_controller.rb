class PurchasesController < ApplicationController
    before_action :set_purchase, only: [:show]

    def index
        @purchases = Purchase.all
        render json: @purchases
    end

    def show
    end

    def new
        @purchase = Purchase.new
        render json: @purchase
    end

    def create
        @purchase = Purchase.new(purchase_params)
        if @purchase.save
        render json: @purchase
        else
        render json: {error: 'This purchase is not valid'}
        end
    end

    def user_purchases
        user = get_current_user
        render json: user.videos
    end

    private
    def purchase_params
        params.require(:purchase).permit(:user_id, :video_id, :total)
    end

    def set_purchase
        @purchase = purchase.find(params[:id])
    end
end
