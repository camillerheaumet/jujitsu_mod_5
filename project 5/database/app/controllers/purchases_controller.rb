class PurchasesController < ApplicationController
    before_action :set_purchase, only: [:show]

    def index
        @purchases = Purchase.all
        render json: @purchases
    end

    def checkout
        @purs = params[:purchase_ids].map {|id| Purchase.find(id)}
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

        @purs.map{|p| p.update(paid: true)}
        render json: @purs
    
        rescue Stripe::CardError => e
          error = e.message
          render json: {errors: error}
        end
    
        
        

    # rescue Stripe::CardError, Stripe::InvalidRequestError => e
    #     
    # end

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
            user_purchases = user.purchases
            paid_videos = user_purchases.select { |pur|pur.paid}
            user_videos = paid_videos.map{|p|p.video}
            if user_videos
                render json: user_videos
            end
        end
    end

    private
    def purchase_params
        params.require(:purchase).permit(:user_id, :video_id, :paid)
    end

    def payment_params
        params.require(:purchase).permit(:id, :total, :stripeToken, :stripeEmail, purchase_ids: [])
    end

    def set_purchase
        @purchase = Purchase.find(params[:id])
    end
end
