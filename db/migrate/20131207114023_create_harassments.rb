class CreateHarassments < ActiveRecord::Migration
  def change
    create_table :harassments do |t|
      t.string :type

      t.timestamps
    end
  end
end
