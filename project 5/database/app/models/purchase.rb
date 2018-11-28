class Purchase < ApplicationRecord
    belongs_to :user
    belongs_to :video

    validates :user_id, :video_id, presence: true
end
