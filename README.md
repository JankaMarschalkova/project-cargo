# Project CarGo

[CarGo App Link](https://pv247-project-cargo.web.app/) 

The `CarGo` app is designed to respond to the needs of people who travel medium to long distances and wish to **share their ride** with others heading in the same direction. The app allows users to create a profile, enter their starting point and destination, and search for potential carpooling partners based on location and route. This approach is **cost-effective** for passengers and drivers and simplifies **environmentally friendly** travel.

The CarGo app offers a user-friendly interface and a range of features to enhance the carpooling experience. Here are some additional details about the app:

* **User profile:** Users can create or edit a personalized profile within the app, providing relevant information such as their username, nickname, age, gender, phone number, car or any aditional note. Profiles help build trust and facilitate communication between carpooling partners. 
The profile of driver is also seen while clicking on the driver name at ride preview.

* **Ride Creation:** Users can easily publish a new ride by entering their leaving from and going to point, along with the date and time of travel. As a driver, they can specify the number of available seats in their vehicle and the price per person in €. This information helps match drivers with suitable passengers.

* **Search and Match:** Passengers can search for available rides based on their desired route and travel time. The app employs an algorithm to suggest potential matches, considering factors such as location and time proximity and it filters the appropriate rides from Firebase database. 

* **Real-Time Status Updates:** Users can view the current status of their own rides, as well as those they have joined. The app provides real-time updates on ride confirmations, cancellations, and any changes in the ride schedule. 
This app also allows user cancel ride. In case of driver it allows cancel ride as well.

* **Environmental Impact:** CarGo promotes environmentally friendly travel by encouraging the sharing of rides and reducing the number of single-occupancy vehicles on the road. By maximizing vehicle occupancy, the app helps decrease traffic congestion and minimize carbon emissions.

## Pages
 * Home
 * Your rides
 * Publish ride
 * Profile
 * Login
 * Results


## Technologies
* **React:** React is a JavaScript library for building user interfaces. It provides a component-based architecture that allows for efficient and reusable UI development. React is commonly used for building single-page applications and provides a responsive and interactive user experience.

* **Firebase:** Firebase is a backend-as-a-service platform provided by Google. It offers various services that are utilized in the CarGo app:

	- **Firebase Collections:** Firebase provides a NoSQL document database called Firestore, which is used to store data in collections and documents. Collections can be used to store information such as user profiles, rides, and ride details.

	- **Firebase Database:** Firebase Realtime Database is another option for storing data. It's a cloud-hosted NoSQL database that can be used for real-time synchronization and data updates.

	- **Sign-in Provider (Google and Email/Password):** Firebase offers authentication services, including sign-in methods like Google and Email/Password. This allows users to securely sign in to the CarGo app using their Google accounts or a custom email/password combination.

	- **Deployment Environment:** Firebase provides hosting services for deploying web applications. It simplifies the process of deploying and managing the CarGo app on the web.
