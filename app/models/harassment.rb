class Harassment < ActiveRecord::Base
  has_many :incidents
  attr_accessible :type_of_harassment
end
