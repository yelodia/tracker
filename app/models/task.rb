class Task < ApplicationRecord
  include AASM
  belongs_to :user, optional: true
  has_many :approve

  validates :title, presence: true
  validates :deadline_at, presence: true
  validate :deadline_in_future?

  aasm column: :status do
    state :new, initial: true
    state :in_progress, :completed, :canceled

    event :start do
      transitions from: :new,
                  to: :in_progress
    end

    event :complete, after: :done do
      transitions from: :in_progress, to: :completed, guard: :has_approves?
    end

    event :cancel, after: :done do
      transitions from: :in_progress, to: :canceled
    end

  end

  def has_approves?
    approve.size > 1
  end

  private

  def done
    update!(done_at: Time.zone.now)
  end

  def deadline_in_future?
    if deadline_at < Time.zone.now
      errors.add(:deadline_at, "can't be in the past")
    end
  end

end
