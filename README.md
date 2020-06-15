#  Courier Tracking API

## Description
This Application tracks the couriers. This programme allows us to add/update/delete couriers. We can even lookup for the couriers by passing the required available capacity. The pick up and drop off endpoints are defined to decrease and increase the capacities respectively.

This application is created using: Node/ExpressJS, MongoDB.

## Installation
1. Download or clone the project
2. Go into the project `cd courier-tracking`
3. You need to add MONGO_URI in config (dev.js) to connect to mongo database.
3. To install dependencies run `npm install`
4. To run the server `npm start`

## API

You can either use Postman or call the API endpoints directly with bash:

To add a courier:

```bash
curl --location --request POST 'http://localhost:3000/couriers' \
--header 'Content-Type: application/json' \
--data-raw '{
    "id": 10,
    "max_capacity": 100,
    "available_capacity": 100
}
'
```

To get all courier with a minimum of capacity of:10

```bash
curl --location --request GET 'http://localhost:3000/couriers/lookup' \
--header 'Content-Type: application/json' \
--data-raw '{
    "capacity_required": 10
}'
```



To update the courier with new max_capacity:

```bash
curl --location --request PUT 'http://localhost:3000/couriers/11' \
--header 'Content-Type: application/json' \
--data-raw '{
    "max_capacity": 400
}
'
```

To decrease the available capacity after the pickup courier:

```bash
curl --location --request PUT 'http://localhost:3000/couriers/pickup/11' \
--header 'Content-Type: application/json' \
--data-raw '{
    "decrease_available_capacity": 10
}
'
```

To increase the available capacity after the drop off courier:

```bash
curl --location --request PUT 'http://localhost:3000/couriers/drop/11' \
--header 'Content-Type: application/json' \
--data-raw '{
    "increase_available_capacity": 10
}
'
```

To delete one courier:

```bash
curl --location --request DELETE 'http://localhost:3000/couriers/10'
```

## Incase of space for improvements, I would like to accomplish below tasks
1. use Docker
2. Api functional tests
3. Automatic migrations
4. Add swagger
5. Add deploy job to CircleCI

About the race conditions we can lock the row on the db while updating.

## Authors or Acknowledgments

Written by Sucharitha Chinnam


