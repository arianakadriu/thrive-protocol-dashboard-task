# Thrive Protocol Task: Build a Responsive Dashboard with React

This project involves creating a responsive dashboard using React. The dashboard is designed to adjust seamlessly across different screen sizes and provide a user-friendly interface for monitoring various data. The Public API used is: [API](https://rickandmortyapi.com/). Click [here](https://thrive-protocol-dashboard-task.vercel.app/) to see the project deployed on Vercel.


## Setup
- <strong>React with Vite and Typescript</strong>
- State management: <strong>Context API</strong>
- Libraries: <strong>Tailwind CSS, Bootstrap Icons</strong>

## Features
### Landing Page
- Displays an introduction related to the dashboard.
- Shows a list of favorite characters.
- Favorite character IDs are stored in context, allowing for the retrieval of multiple characters based on those IDs.
### Dashboard Page
- Displays a table with fetched data about all characters and pagination.
- Includes a search functionality at the top to filter characters by <strong>name, status, species, and gender.</strong>
- Column headers are sortable too, click on column name and it will sort data in ascending or descending order.
- Provides batch actions: Favorite, Edit, and Delete.
   - <strong>Favorite:</strong> Stores the IDs of selected characters in context, which are then displayed on the landing page.
   - <strong>Delete:</strong> Only disables or enables the table row, as the public API doesn't support character deletion.
   - <strong>Edit:</strong> Redirects to the details page for the selected character.
### Details Page
- <strong>Navigation:</strong> Accessed by clicking "Edit Character" in the dashboard or "Learn More" from the favorite characters list on the landing page.
- <strong>Profile Card:</strong>
   - Displays the character's image and profile information.
   - Includes two buttons at the end:
   - <strong>Go to Dashboard:</strong> Returns to the main dashboard.
   - <strong>Edit Profile:</strong> Opens a form to edit the character's profile data.
   - <strong>Note:</strong> Updated data is stored only in context, as the public API does not support updates.
- <strong>Episodes List:</strong>
   - Below the profile card is a list of episodes the character appeared in.
   - Episode numbers are extracted from the character's episode array and stored in a new array.
   - The get multiple characters public API is used to fetch details for multiple episodes.
