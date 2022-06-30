class ApplicationController < ActionController::Base
  protect_from_forgery with: :exception

  def current_user
    @current_user ||= super || User.new
  end

  def user_signed_in?
    !current_user.nobody?
  end
end
