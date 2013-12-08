class Incident < ActiveRecord::Base
  belongs_to :harassment
  attr_accessible :age, :date_of_incident, :description, :location, :harassment_id, :longitude, :latitude
end
