class CreateHarassments < ActiveRecord::Migration
  def change
    create_table :harassments do |t|
      t.string :type_of_harassment

      t.timestamps
    end
  end
end
