![Header Name](./public/images/Evidential.png)

# Evidential
An app to analyze and rate the arguments made within texts for various claims they attempt to support. A slightly more robust summary is taken from the splash page:

> Evidential is here to help researchers understand and analyze written works&mdash;books, journal articles, essays, opinion pieces&mdash;whatever type of <strong>text</strong> that makes a <strong>claim</strong> and then tries to back it up with additional <strong>arguments</strong> (evidence).</p>
>
>The purpose is to create a space to collaboratively <strong>rate</strong> the arguments against the claims in a text, building a body of metadata to <strong>profile</strong> how <em>much</em> a text covers a particular claim and its arguments, as well as how <em>effectively</em> it covers those things.

## Features

1. *Users*: Signup, login, logout, password protected edit and (soft) delete, track change history of all things except user and text.
2. *Texts*: View, upload, and limited edit/delete (only user who uploads and only until first analysis has been ran, after which text will be locked)
3. *Claims*: View (Upcoming: add, edit, assign to texts [analyze])
4. *Arguments*: View (Upcoming: add, edit, assign to claims)
5. *Hit Keys*: View (Upcoming: add, edit, assign to claims)
6. *Ratings*: (Upcoming: view, add, edit)
7. *Profile*: (Upcoming: statistics based off ratings and text/claim combos)

## Local Installation of the App

For those interested in development and testing purposes, follow these step-by-step guidelines to run the app locally.

### Prerequisites

To run this application locally you will need Git, node.js (and its package manager that comes with it, npm), python 3.9, and a PostgreSQL database.

### Installing

```
# Clone this repository
$ git clone https://github.com/scottgit/evidential.git
```
1. Create a database named evidential_dev and an owner named evidential_app with a password
2. Create .env file at the root of this project, add environment variables provided in .env.example to .env file (make sure the database URL is set correctly)
3. Create a second .env file under the react-app directory with the needed REACT_APP_TINY_API key set to your api key from https://www.tiny.cloud/.

```
# At the root of the repository, install backend dependencies
$ pipenv install --dev -r dev-requirements.txt && pipenv install -r requirements.txt

# Still at root, open up the virtual environment shell, migrate and upgrade database tables and seed data.
$ pipenv shell
$ flask db migrate
$ flask db upgrade
$ flask seed all

# Change into the react-app directory, install frontend dependencies
$ npm install
```

### Running Application

```
# Inside the react-app directory, start the frontend server
$ npm start

# Change to the root directory and start the backend server

# If you are still inside your virtual environment shell, then just do...
$ flask run
# Otherwise, if you exited the shell, then...
$ pipenv run flask run
```
The frontend of the application should open up in your browser from localhost:3000,
while it is being served on the backend from localhost:5000

## Technologies Used

This is not an exhuastive list, but a highlight of some of the main technologies and extra plugins used witihin the app.

### Backend
* PostgreSQL
* Flask
  * Database support: [flask-sqlalchemy](https://flask-sqlalchemy.palletsprojects.com/en/2.x/)
  * Convert pdf support: [pdfminer.six](https://github.com/pdfminer/pdfminer.six)
  * URL request support: [requests](https://github.com/psf/requests)

### Frontend
* React
  <!-- * Annotation and Highlight support (for Text analysis): [react-text-annotate](https://github.com/mcamac/react-text-annotate)
  * Search support (various uses on site): [react-elasticsearch](https://github.com/betagouv/react-elasticsearch) -->
  * File upload support (for Text creation): [react-dropzone](https://github.com/react-dropzone/react-dropzone)
  <!-- * Slider component (for Ratings): [react-component/slider](https://github.com/react-component/slider)
  * Bar charts (for Text profile display): [react-charts/bar-chart](https://canvasjs.com/react-charts/bar-chart/) -->
  * Icons [fontawesome with react](https://fontawesome.com/how-to-use/on-the-web/using-with/react)
  * HTML Sanitizing: [DOMPurify](https://github.com/cure53/DOMPurify)
  * Modal support: [react-modal](https://github.com/reactjs/react-modal)

## Contributing

This repo is currently a student portfolio project, and not likely to be modified. However, if you still think you have a contribution to make, then give it go:

1. Clone repo `$ git clone https://github.com/scottgit/evidential.git`
2. Create a new branch: `$ git -b name_of_branch`
3. Make changes
4. Submit a Pull Request with description of changes for discussion and review

## Author
* **Scott Smith** - https://github.com/scottgit


<!-- ## Acknowledgments

* App Academy for helping us develop the skills necessary to create this app. -->
