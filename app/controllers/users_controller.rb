class UsersController < ApplicationController

  respond_to :json

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
