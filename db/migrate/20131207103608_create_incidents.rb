class CreateIncidents < ActiveRecord::Migration
  def change
    create_table :incidents do |t|
      t.string :location, :null => false
      t.datetime :date_of_incident, :null => false
      t.string :type_of_harassment, :null => false
      t.string :description
      t.integer :age, :null => false
      t.timestamps
    end
  end
end
