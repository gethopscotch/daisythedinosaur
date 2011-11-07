load 'hopscotch.rb'
require 'bacon'
require 'capybara/dsl'
include Capybara::DSL
Capybara.default_driver = :selenium
describe 'the app' do
  before do
    Capybara.app = Sinatra::Application.new
  end
  it "should load the welcome page" do
    visit '/'
    page.has_content?('sign up').should.equal true
  end
  it "should load the app" do
    visit '/app'
    page.has_content?('program').should.equal true
  end
end
