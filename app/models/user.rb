class User < ApplicationRecord
  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable, :trackable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable

  enum role: { nobody: 0, user: 1, admin: 2}

  has_many :tasks

  before_save :autofill

  private

  def autofill
    self.role = :user if nobody?
    self.name = email.split('@').first unless self.name.present?
    self.email.downcase! if self.email
  end

end
