require 'test_helper'

class RoutesControllerTest < ActionController::TestCase
  test "should find airlines" do 
    post :find, :route => {:from => "Singapore", :to => "Manila"}
    assert_response :success
  end
end
