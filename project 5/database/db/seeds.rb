User.create(name: "Cam", email: "cam@cam.cam", password: "cam", admin:true)
User.create(name: "Jade", email: "jade@jade.jade", password: "jade")
User.create(name: "Bobby", email: "bobby@bobby.bobby", password: "bobby")

Video.create(name: "Some Jiu Jitsu Demo", price: 2.99, description: "Some Jiu Jitsu demo on youtube for testing", image_url: "", download_url: "https://youtu.be/gSF6ZS1I0Pc")
Video.create(name: "Random Jiu Jitsu motivation", price: 3.99, description: "Some random motivation video just for testing", image_url: "", download_url: "https://youtu.be/LUmgrve1sZc")
Video.create(name: "Jiu Jitsu vs Aikido test", price: 4.99, description: "random jiu jitsu video for testing", image_url: "", download_url: "https://youtu.be/GXO9FrZ1N9s")

Purchase.create(user_id: 3, video_id: 2, paid: true)
Purchase.create(user_id: 1, video_id: 1, paid: true)
Purchase.create(user_id: 1, video_id: 2, paid: true)
Purchase.create(user_id: 1, video_id: 3, paid: true)
Purchase.create(user_id: 2, video_id: 3, paid: false)
Purchase.create(user_id: 2, video_id: 2, paid: true)



