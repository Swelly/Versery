class UsersController < ApplicationController

  def destroy
  end

  # GET
  # shows a user profile
  def show
    @user = User.find(params[:id])
  end

end
