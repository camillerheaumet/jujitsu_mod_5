class PurchasesController < ApplicationController
    before_action :set_purchase, only: [:show]

    def index
        @purchases = Purchase.all
        render json: @purchases
    end

    def checkout
        puts params
        customer = Stripe::Customer.create(
            source: params[:stripeToken],
            email:  params[:stripeEmail]
        )
        
        charge = Stripe::Charge.create(
            :customer    => customer.id,   # You should store this customer id and re-use it.
            :amount      =>  params[:total],
            :description    =>  "Payment for purchase",
            :currency    => "gbp"
        )

    
        
        # @purchase.update(payment: charge.to_json, state: 'paid')
        render json: {errors: "wait what?"}

    rescue Stripe::CardError, Stripe::InvalidRequestError => e
        render json: {errors: error.message}
    end

    def show
    end

    def new
        @purchase = Purchase.new
        render json: @purchase
    end

    def create
        params[:video_ids].each do |video|
            @purchase = Purchase.new(user_id: params[:user_id], video_id: video)
            if !@purchase.save
                render json: {error: 'This purchase is not valid'}
            end
        end
        
        render json: @purchase
    end

    def user_purchases
        user = get_current_user
        if user.videos
        render json: user.videos
        end
    end

    private
    def purchase_params
        params.require(:purchase).permit(:user_id, :video_id)
    end

    def set_purchase
        @purchase = Purchase.find(params[:id])
    end
end
