class AddLatitudeLongitudeToIncident < ActiveRecord::Migration
  def change
    add_column :incidents, :latitude, :string
    add_column :incidents, :longitude, :string
  end
end
