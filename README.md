# Flight Finder

This application built with [Ruby on Rails](http://rubyonrails.org/) and [yo angular generator](https://github.com/yeoman/generator-angular). The middleware is using the API endpoint of the [FlightAPI](https://github.com/codenut/flightapi) project.

The files for the frontend is under the assets directory.

# Backend - Middleware

This is a [Ruby on Rails](http://rubyonrails.org/) project to serve as a microservice endpoint that the frontend will use.


## Settings

The url for the FlightAPI can be set on the settings file under:

config/settings.yml

and update this section with the corresponding URL.

    api:
        url: http://localhost:8080/
    
## Running the application

* To test the project run:

        rake test
        
* To run the server run:

        rails server


# Frontend

This project is generated with [yo angular generator](https://github.com/yeoman/generator-angular)
version 0.12.1.

## Setup

* Run this command to install npm dependencies
    
        npm install
        
* Run this command to install bower dependencies

        bower install

## Build & Development

Run `grunt` for building and `grunt serve` for preview.

The output for the build commands will be moved in the RoR public directory.

##### 


## Testing

Running `grunt test` will run the unit tests with karma.