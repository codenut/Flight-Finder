json.array!(@routes) do |route|
  json.extract! route, :id, :from, :to
  json.url route_url(route, format: :json)
end
