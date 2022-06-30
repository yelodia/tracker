class CreateTasks < ActiveRecord::Migration[5.1]
  def change
    create_table :tasks do |t|
      t.references :user, null: true
      t.string  :title, null: false, default: ""
      t.string  :status, null: false, default: ""
      t.datetime :done_at
      t.datetime :deadline_at
      t.timestamps null: false
    end

    add_index :tasks, :status
  end
end
