require 'yaml'
require 'uri'
require 'erb'

def error(message)
  $stderr << message
  exit 1
end

config_path = ARGV.fetch(0) { error("Usage: #{$0} <config_path>") }
config = YAML.load_file(config_path)

@app_name = config.fetch('app_name') { error('Missing app_name in config') }
@host = config.fetch('host') { error('Missing host in config') }

def url_for(path)
  URI.join(@host, path).to_s
end

$stdout << ERB.new(File.read(File.expand_path('./slack-manifest.yml.erb', __dir__))).run(binding)
