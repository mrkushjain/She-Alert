class AddTypeOfHarassmentToIncident < ActiveRecord::Migration

  def up
    change_table :incidents do |t|
      t.references :harassment
    end
  end

  def down
    change_table :incidents do |t|
      t.remove :harassment_id
    end
  end
end
