require 'rest-client'

class CitiesController < ApplicationController
  
  def index
    data = RestClient.get (Settings.api.url + "cities"), 
                                :content_type => :xml, 
                                :accept => :xml
    data = HashWithIndifferentAccess.from_xml(data)['root']

    #check if airlines is a list
    if !data.blank? and 
        !data['cities'].blank? and 
        !data['cities'].kind_of?(Array)
      data['airlines'] = [data['airlines']]
    end

    render json: data.to_json
  end

end