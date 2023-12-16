## API Endpoints

- **Retrieve available Rooms**
  - GET - `/api/v1/available-rooms`
  - Parameters
    - `checkInDate`: The desired check in date
    - `checkOutDate`: The desired check out date
    - `hotelIds (optional)`: A comma-separated list of hotel ids
    - `roomTypes (optional)`: A comma-separated list of room type, match `room_types.type`
    - `page (optional, default to 1)`: The page number of the results
    - `pageSize (optional, default to 20)`: The number of item per page
    - Response
      ```
      {
        data: [{
          hotelId,
          hotelName,
          roomType, // room_types.type
          roomTypeId, // room_types.id
          availableCount,
          date
        }],
        pagination: {
          currentPage,
          pageSize,
          totalItems
        }
      }
      ```
- **Create a New Booking**
  - POST - `/api/v1/bookings`
  - Request Body
    ```
      {
        bookingId: 0,
      	 lines: [{
          roomTypeId,
          checkInDate,
          checkOutDate
        }]
      }
    ```
  - Response
    ```
    {
      bookingId
    }
    ```
- **Retrieve Existing Bookings**
  - GET - `/api/v1/bookings`
  - Parameters
    - `checkInDate (optional)`: The desired check in date
    - `checkOutDate (optional)`: The desired check out date
    - `hotelIds (optional)`: A comma-separated list of hotel ids
    - `roomTypes (optional)`: A comma-separated list of room type, match `room_types.type`
    - `userIds (optional)`: A comma-separated list of userIds`
    - `page (optional, default to 1)`: The page number of the results
    - `pageSize (optional, default to 20)`: The number of item per page
    - Response
      ```
      {
        data: [
          {
            bookingId,
            status,
            totalPrice,
            userId,
            userName,
      	     lines: [{
              roomTypeId,
              roomId, // optional if hasn't checkin
              price,
              checkInDate,
              checkOutDate
            }]
          }
        ],
        pagination: {
          currentPage,
          pageSize,
          totalItems
        }
      }
      ```
- **Retrieve the Existing Booking**
  - GET - `/api/v1/bookings/{bookingId}`
  - Response
    ```
    {
      bookingId,
      status,
      totalPrice,
      userId,
      userName,
    	 lines: [{
        roomTypeId,
        roomId, // optional if hasn't checkin
        price,
        checkInDate,
        checkOutDate
      }]
    }
    ```
- **Update a Booking**
  - PUT - `/api/v1/bookings/{bookingId}`
  - Request Body
    ```
     {
       bookingId,
     	 lines: [{
         roomTypeId,
         checkInDate,
         checkOutDate
       }]
     }
    ```
    - Response
      ```
      {
        bookingId
      }
      ```
- **Cancel a Booking**
  - DELETE - `/api/v1/bookings/{bookingId}`
  - Response
    ```
    {
      bookingId
    }
    ```

## Database Schema

- **hotels**
  - Stores information about various hotels
- **room_types**
  - Represents different types of rooms available in each hotel, such as standard, deluxe, suite, etc
- **rooms**
  - Individual rooms that are available for booking in each hotel
- **users**
  - Stores information about various hotels
- **bookings**
  - Represents one booking order made by the user
- **booking_lines**
  - Detail records of each room type booked within one booking order
- **inventory**
  - Tracks the availability of rooms of different types in each hotel for specific dates
  - For performance consideration of large volumn of reading action
- DB Diagram
  - [https://dbdiagram.io/d/Database-Schema-657d3b6656d8064ca02281be]()

## Authentication & Security

- Utilize OAuth 2.0 framework by issuing Access Token in JWT format
- Recommend Auth0 for the actual integration
- Nextjs can use NextAuth.js
- For non-public api routes, current user data will be obtained by the request
- Users table in our DB will be used mostly for authorization purpose

## Error Handling

- Use of HTTP Status Codes
  - `400 Bad Request`: For validation error or request data is invalid. Normally return error data specific below
    - Frontend should display friendly message and instruction
  - `401 Unauthorized`: User is not login and trying to access protected resources
    - Frontend should redirect the user to home page or prompt the user to login
  - `403 Forbidden`: Current user is authenticated but has permission to access the required resources
    - Frontend should redirect or prompt the user to Forbidden page/message
  - `404 Not Found`: Required resource does not exist or is_active = false
    - Frontend should redirect or prompt the user to Not Found page/message
  - `500 Internal Server Error`: For unhandled exceptions or server error
    - Server use middleware to catch this error and log the detail for further investigation
    - Frontend should display friendly message
  - `503 Service Unavailable`: API is temporarily unavailable
- Consistent Error Response Structure
  ```
  {
    // Define a set of standard error codes that both the frontend and backend
    // The frontend can use these codes to display localized error messages to the user
    code,
    // (Optional) additional detail data for info needed to be provided to the user
    data
  }
  ```

## Rate Limit

- Implement rate limit base on IP address or API Key issued
- Use multi time windows control for rate limit e.g
  - 5 requests per 15 mins
  - 14400 requests per 30 days
  - 30000 requests per 30 days across all api routes

## Caching

- CDN for static assets like images, CSS or JS files
- Redis for distributed caching

## API versioning

- route-based versioning. e.g /api/v1/bookings
