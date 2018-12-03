class User < ApplicationRecord
    has_many :purchases
    has_many :videos, through: :purchases
    has_secure_password

    validates :name, :email, presence: true
    validates :email, uniqueness: true
    # validates :password, presence: true, on: :create, :sign_in, :validate, :get_videos
end
