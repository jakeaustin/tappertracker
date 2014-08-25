class AddScoresToUsers < ActiveRecord::Migration
  def change
    add_column :users, :slow_score, :decimal, precision: 5, scale: 2
    add_column :users, :medium_score, :decimal, precision: 5, scale: 2
    add_column :users, :fast_score, :decimal, precision: 5, scale: 2
  end
end
