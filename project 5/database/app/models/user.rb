class User < ApplicationRecord
    has_many :purchases
    has_many :videos, through: :purchase
    has_secure_password

    validates :name, :email, :password, presence: true
    validates :email, uniqueness: true
end
