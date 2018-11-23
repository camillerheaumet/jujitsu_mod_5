class Video < ApplicationRecord
    has_many :purchases
    has_many :users, through: :purchase

    validates :name, :price, :download_url, presence: true
    validates :name, :download_url, uniqueness: true
end
