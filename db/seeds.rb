# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rake db:seed (or created alongside the db with db:setup).
#
# Examples:
#
#   cities = City.create([{ name: 'Chicago' }, { name: 'Copenhagen' }])
#   Mayor.create(name: 'Emanuel', city: cities.first)


10.times do |i|
  User.create!(email: Faker::Internet.safe_email, password: 'password', slow_score: i*100, medium_score: i*50, fast_score: i*25)
  puts "Created user #{i}"
end
