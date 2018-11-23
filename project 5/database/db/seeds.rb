# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first

User.create(name: "Cam", email: "cam@cam.cam", password: "cam")
User.create(name: "Jade", email: "jade@jade.jade", password: "jade")
User.create(name: "Bobby", email: "bobby@bobby.bobby", password: "bobby")

Video.create(name: "cat", price: 2.99, description: "cat video yay", image_url: "lalala", download_url: "lalala")
Video.create(name: "dog", price: 3.99, description: "dog video yay", image_url: "nanana", download_url: "nanana")
Video.create(name: "cow", price: 4.99, description: "cow video yay", image_url: "hahaha", download_url: "hahaha")

Purchase.create(user_id: 3, video_id: 2)
Purchase.create(user_id: 1, video_id: 1)
Purchase.create(user_id: 1, video_id: 2)
Purchase.create(user_id: 1, video_id: 3)
Purchase.create(user_id: 2, video_id: 3)
Purchase.create(user_id: 2, video_id: 2)



