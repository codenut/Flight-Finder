require 'rest-client'

class RoutesController < ApplicationController
  protect_from_forgery :except => :find 

  def index
    render :file => 'public/index.html'
  end

  def find
    route = {:from => route_params[:from], 
             :to => route_params[:to]}
            .to_xml(:root => :root)

    data = RestClient.post (Settings.api.url + "route"), 
                                route, 
                                :content_type => :xml, 
                                :accept => :xml

    data = HashWithIndifferentAccess.from_xml(data)['root']

    #check if airlines is a list
    if !data.blank? and 
        !data['airlines'].blank? and 
        !data['airlines'].kind_of?(Array)
      data['airlines'] = [data['airlines']]
    end

    render json: data.to_json
  end

  private
    # Use callbacks to share common setup or constraints between actions.
    def set_route
      @route = Route.find(params[:id])
    end

    # Never trust parameters from the scary internet, only allow the white list through.
    def route_params
      params.require(:route).permit(:from, :to)
    end
end
