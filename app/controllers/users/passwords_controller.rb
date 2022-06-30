class Users::PasswordsController < Devise::PasswordsController
  def create
    super do |resource|
      if successfully_sent?(resource)
        flash[:info] = 'Password reset link has been sent to your email address'
      end
    end
  end
end
