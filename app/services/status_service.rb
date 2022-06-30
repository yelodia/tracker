# frozen_string_literal: true

class StatusService
  attr_reader :task, :user

  ALLOWED_STATUSES = %w(in_progress completed canceled)

  def initialize(task, user)
    @task = task
    @user = user
  end

  def set(status)
    return false unless ALLOWED_STATUSES.include?(status)
    send(status)
  end

  def approve
    return false unless task.in_progress?
    approve = Approve.new(task_id: task.id, user_id: user.id)
    approve.save! rescue false
  end

  private

  def in_progress
    return false unless task.may_start?
    task.user = user
    task.start!
    true
  end

  def completed
    return false unless task.may_complete?
    task.complete!
    true
  end

  def canceled
    return false unless task.may_cancel?
    task.cancel!
    true
  end

end
