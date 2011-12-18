task :default => [:test]

task :test do
  ruby "test/smoke_test.rb"
end

task :build do
  `cp -r static/ ../iOS/DaisyTheDinosaur/www/`
  `cp views/*.html ../iOS/DaisyTheDinosaur/www/`
end

begin
  require 'jasmine'
  load 'jasmine/tasks/jasmine.rake'
rescue LoadError
  task :jasmine do
    abort "Jasmine is not available. In order to run jasmine, you must: (sudo) gem install jasmine"
  end
end
