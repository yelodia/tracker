json.extract! task, :id, :title, :status, :created_at, :done_at, :deadline_at, :updated_at
json.user task.user.name rescue nil
json.may_complete task.may_complete?
