class PaymentsController < ApplicationController
    before_action :set_purchase

    def new
        key = Rails.configuration.stripe[:publishable_key]
        another_key = ENV[:publishable_key]
    end

    def create
    end

    private

    def set_order
        @order = current_user.purchases.find(params[:purchases_id])
    end
end
