url_options = { host: Settings.mailer.host }
url_options[:port] = Settings.mailer.port if Settings.mailer.port.present?

Rails.application.config.tap do |config|
  config.action_mailer.default_url_options = url_options
  config.perform_delivers = true

  if Settings.mailer.service == 'smtp'
    config.action_mailer.delivery_method = :smtp
    config.action_mailer.raise_delivery_errors = true

    config.action_mailer.smtp_settings = {
        address: Settings.mailer.smtp.address,
        domain:  Settings.mailer.smtp.domain,
        port:    Settings.mailer.smtp.port,

        user_name: Settings.mailer.smtp.email,
        password:  Settings.mailer.smtp.password,

        authentication: Settings.mailer.smtp.authentication,
        enable_starttls_auto: true
    }
  elsif Settings.mailer.service == 'sendmail'
    config.action_mailer.delivery_method = :sendmail
    config.action_mailer.raise_delivery_errors = true

    config.action_mailer.sendmail_settings = {
        location:  Settings.mailer.sendmail.location,
        arguments: Settings.mailer.sendmail.arguments
    }
  elsif Settings.mailer.service == 'letter_opener'
    config.action_mailer.delivery_method = :letter_opener
    config.action_mailer.raise_delivery_errors = true
  else
    config.action_mailer.delivery_method = :test
    config.action_mailer.raise_delivery_errors = false
  end
end
