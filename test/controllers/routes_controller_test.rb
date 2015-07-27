require 'test_helper'

class RoutesControllerTest < ActionController::TestCase
  setup do
    @route = routes(:one)
  end

  test "should find airlines" do 
    post :find, :route => {:from => @route[:from], :to => @route[:to]}
    assert_response :success
  end
end
