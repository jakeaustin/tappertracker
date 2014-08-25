class UsersController < ApplicationController

  respond_to :json

  def show
    respond_with @user = User.find(current_user)
  end

end
