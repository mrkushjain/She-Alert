require 'test_helper'

class HarassmentsControllerTest < ActionController::TestCase
  setup do
    @harassment = harassments(:one)
  end

  test "should get index" do
    get :index
    assert_response :success
    assert_not_nil assigns(:harassments)
  end

  test "should get new" do
    get :new
    assert_response :success
  end

  test "should create harassment" do
    assert_difference('Harassment.count') do
      post :create, harassment: { type: @harassment.type }
    end

    assert_redirected_to harassment_path(assigns(:harassment))
  end

  test "should show harassment" do
    get :show, id: @harassment
    assert_response :success
  end

  test "should get edit" do
    get :edit, id: @harassment
    assert_response :success
  end

  test "should update harassment" do
    put :update, id: @harassment, harassment: { type: @harassment.type }
    assert_redirected_to harassment_path(assigns(:harassment))
  end

  test "should destroy harassment" do
    assert_difference('Harassment.count', -1) do
      delete :destroy, id: @harassment
    end

    assert_redirected_to harassments_path
  end
end
