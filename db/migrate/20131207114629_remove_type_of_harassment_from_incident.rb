class RemoveTypeOfHarassmentFromIncident < ActiveRecord::Migration
  def change
    remove_column :incidents, :type_of_harassment
  end
end
