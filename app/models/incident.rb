class Incident < ActiveRecord::Base
  attr_accessible :age, :date_of_incident, :description, :location, :type_of_harassment
end
