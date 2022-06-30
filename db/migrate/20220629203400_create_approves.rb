class CreateApproves < ActiveRecord::Migration[5.1]
  def change
    create_table :approves do |t|
      t.references :user, null: false
      t.references :task, null: false
      t.timestamps null: false
    end

    add_index :approves, [:user_id, :task_id], unique: true
  end
end
