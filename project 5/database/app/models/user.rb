class User < ApplicationRecord
    has_many :purchases
    has_many :videos, through: :purchases
    has_secure_password

    validates :name, :email, :password, presence: true
    validates :email, uniqueness: true
end
