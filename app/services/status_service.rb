# frozen_string_literal: true

class FlashDataService
  attr_reader :context
  delegate :current_user, :session, to: :context

  def initialize(context)
    @context = context
    @data = {}
  end

  def set(key: nil, value:)
    full_key = full_key(key)
    Rails.cache.write full_key, value
  end

  def [](key)
    full_key = full_key(key)
    @data.fetch(full_key) do
      @data[full_key] ||= Rails.cache.read full_key
      Rails.cache.delete full_key
      @data[full_key]
    end
  end

  def any?
    Rails.cache.data.keys("flash_data_#{subkey_id}*").any?
  end

  def none?
    !any?
  end

  def migrate!
    each_key do |key, new_key|
      data = Rails.cache.read key
      Rails.cache.delete key
      Rails.cache.write new_key, data
    end
  end

  def default
    self['']
  end

  protected

  def full_key(key)
    ['flash_data', subkey_id, key].select(&:present?).join('_')
  end

  def subkey_id
    [current_user.id, session.id].compact.first
  end

  def each_key
    Rails.cache.data.keys("flash_data_#{session.id}*").each do |key|
      key =~ /\Aflash_data_[a-z0-9]{32}(.*)\z/
      new_key = "flash_data_#{current_user.id}#{Regexp.last_match(1)}"
      yield key, new_key
    end
  end
end
