class AddScoresToUsers < ActiveRecord::Migration[7.0]
  def change
    add_column :users, :slow_score, :decimal, precision: 6, scale: 2, default: 1000
    add_column :users, :medium_score, :decimal, precision: 6, scale: 2, default: 1000
    add_column :users, :fast_score, :decimal, precision: 6, scale: 2, default: 1000
  end
end
