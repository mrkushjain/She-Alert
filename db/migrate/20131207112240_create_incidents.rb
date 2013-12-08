class CreateIncidents < ActiveRecord::Migration
  def change
    create_table :incidents do |t|
      t.string :location
      t.string :date_of_incident
      t.string :type_of_harassment
      t.string :description
      t.integer :age

      t.timestamps
    end
  end
end
