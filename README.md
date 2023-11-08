# FYLE INTERNSHIP CHALLENGE '23

# GitHub Repository Viewer

This Angular application allows you to search for GitHub repositories by username and view their details.

## Features

- Search for GitHub repositories by username.
- View a user's profile information.
- List a user's repositories.
- View detailed information about a specific repository.

## Folder Structure

The project structure is organized as follows:

- `src/app/components/profile/`: This directory contains the component responsible for displaying user profile.
- `src/app/components/repos/`: This directory contains the component for listing user repositories.
- `src/app/components/repoview/`: This directory contains the component for displaying detailed information about a repository.
- `src/app/components/search/`: This directory contains the search component for searching GitHub repositories.

## Prerequisites

Before running the project, make sure you have the following prerequisites:

- Node.js and npm installed. You can download them from [https://nodejs.org/](https://nodejs.org/).
- Angular CLI installed. You can install it globally using the following command:

  ```sh
  npm install -g @angular/cli

## Installation
Follow these steps to install and run the application:

1. Clone the repository:
2. Install the project dependencies:
```sh
   npm install
```

## Running the Application
To run the application, use the following command:

```sh
   ng serve
````

## Usage
Enter a GitHub username in the search bar.
Click the "Search" button.
View the user's profile, a list of repositories, and click on a repository to view its details.

## Run Test Cases
Using following command you can also see the code coverage : 
```sh
ng test --code-coverage
```
