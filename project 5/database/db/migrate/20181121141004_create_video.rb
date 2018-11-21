class CreateVideo < ActiveRecord::Migration[5.2]
  def change
    create_table :videos do |t|
      t.string :name
      t.float :price
      t.string :description
      t.string :image_url
      t.string :download_url
      t.timestamps
    end
  end
end
