class UsersController < ApplicationController

  respond_to :json
  def leaders
    @top_slow_users = User.order(slow_score: :asc).limit(5)
    @top_medium_users = User.order(medium_score: :asc).limit(5)
    @top_fast_users = User.order(fast_score: :asc).limit(5)
    @leaders = {:slow => @top_slow_users, :medium => @top_medium_users, :fast => @top_fast_users}
    respond_with(@leaders)
  end

  def show
    respond_with @user = User.find(current_user)
  end

  def update
    @user = User.find(current_user)
    @user.update(user_params)
    respond_with @user
  end

  private

  def user_params
    params.require(:user).permit(:slow_score, :medium_score, :fast_score)
  end
end
