# frozen_string_literal: true

class Users::PasswordsController < Devise::PasswordsController
  include MetricSessionConcern
  before_action :save_metric_session_id, only: :update

  def create
    super do |resource|
      if successfully_sent?(resource)
        flash[:info] = t('recover.mes_success')
      end
    end
  end
end
