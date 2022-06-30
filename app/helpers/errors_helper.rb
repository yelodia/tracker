# frozen_string_literal: true

module ErrorsHelper
  def errors_for(f, attr, with_attr_name: false)
    klass = f.object.class
    capture do
      f.object.errors.messages[attr].each do |err|
        msg = err
        msg = klass.human_attribute_name(attr) + ' ' + msg if with_attr_name
        concat wrap_error(msg)
      end
    end
  end

  def wrap_error(message)
    content_tag(:div, message, class: 'error')
  end

  def field_with_errors(f, *attrs, &block)
    errors = f.object.errors
    return yield unless attrs.detect { |attr| errors.messages[attr].any? }
    concat content_tag(:div, class: 'field_with_errors', &block)
  end
end
