# Project Template: Strapi v5 CMS with Astro Frontend

A template repository for blog projects using Strapi v5 as the CMS and Astro as the frontend framework. This setup allows you to quickly start new blog projects with a pre-configured CMS and frontend.

## Table of Contents
- [Project Structure](#project-structure)
- [Prerequisites](#prerequisites)
- [Installation](#installation)
- [Running the Project](#running-the-project)
- [Configuration](#configuration)
- [Advantages over WordPress](#advantages-over-wordpress)
- [Notes](#notes)
- [License](#license)

## Project Structure

```bash
/ (root)
├── cms/           # Strapi v5 CMS backend
└── frontend/      # Astro frontend application
```

## Prerequisites

Before you begin, ensure you have the following installed on your system:

- Node.js (version 18.x or higher)
- npm (comes with Node.js)
- Git (to clone the repository)

## Installation

### 1. Clone the Repository

```bash
git clone https://github.com/your-username/your-repo-name.git
cd your-repo-name
```

### 2. Install Dependencies

#### a. CMS (Strapi v5)

Navigate to the cms/ directory and install dependencies:

```bash
cd cms
npm install
```

#### b. Frontend (Astro)

Navigate to the frontend/ directory and install dependencies:

```bash
cd ../frontend
npm install
```

# Environment Variables Setup

## Environment Variables

To run this project, you will need to set up the following environment variables in a `.env` file at the root of your project:

### Strapi Backend
```sh
HOST=0.0.0.0
PORT=1337
APP_KEYS="your-app-keys-here"
API_TOKEN_SALT=your-api-token-salt
ADMIN_JWT_SECRET=your-admin-jwt-secret
TRANSFER_TOKEN_SALT=your-transfer-token-salt
JWT_SECRET=your-jwt-secret

# Database
DATABASE_CLIENT=sqlite
DATABASE_FILENAME=.tmp/data.db

# For production, use these database settings instead:
# DATABASE_CLIENT=postgres
# DATABASE_HOST=your-database-host
# DATABASE_PORT=5432
# DATABASE_NAME=your-database-name
# DATABASE_USERNAME=your-username
# DATABASE_PASSWORD=your-password
# DATABASE_SSL=true
```

### Astro Frontend
```sh
PUBLIC_STRAPI_URL=http://localhost:1337
PUBLIC_STRAPI_API_TOKEN=your-api-token-here
```

### How to set up

1. Copy the `.env.example` file to a new file named `.env`:
   ```bash
   cp .env.example .env
   ```

2. Generate secure keys for your environment:
   - App Keys: Generate four random keys separated by commas
   - All other secrets: Generate random strings (32 characters recommended)
   - You can use this command to generate random strings:
     ```bash
     openssl rand -base64 32
     ```

3. For the Strapi API token:
   - Log into your Strapi admin panel
   - Go to Settings > API Tokens
   - Create a new full-access API token
   - Copy this token to your frontend .env file

4. If using Begin.com for deployment:
   - Add these environment variables in your Begin.com dashboard
   - Go to your project settings
   - Add each variable under the Environment Variables section

⚠️ **Important Notes:**
- Never commit the `.env` file to version control
- Keep your API tokens and secrets secure
- Different environments (development, staging, production) should use different tokens


## Running the Project

### 1. Start the CMS

In the cms/ directory, start the Strapi server:

```bash
cd ../cms
npm run develop
```

This will start the Strapi CMS in development mode. The default URL is http://localhost:1337.

### 2. Start the Frontend

In a new terminal window, navigate to the frontend/ directory and start the Astro development server:

```bash
cd ../frontend
npm run dev
```

This will start the Astro frontend application. The default URL is http://localhost:4321.

## Configuration

### Environment Variables

#### CMS (Strapi v5)

Strapi uses environment variables for configuration. You can create a `.env` file in the cms/ directory.

Example `.env` file:

```env
HOST=localhost
PORT=1337
APP_KEYS=your_app_keys
API_TOKEN_SALT=your_api_token_salt
ADMIN_JWT_SECRET=your_admin_jwt_secret
TRANSFER_TOKEN_SALT=your_transfer_token_salt
```

Replace the placeholders (`your_app_keys`, `your_api_token_salt`, etc.) with secure, random strings.

#### Frontend (Astro)

The frontend application needs to communicate with the CMS. Create a `.env` file in the frontend/ directory:

```env
PUBLIC_STRAPI_URL=http://localhost:1337
PUBLIC_STRAPI_API_TOKEN=your_strapi_api_token
```

- `PUBLIC_STRAPI_URL`: The URL where your Strapi CMS is running.
- `PUBLIC_STRAPI_API_TOKEN`: The API token for accessing the Strapi API (see below for instructions on generating this token).

### Generating a Strapi API Token

To generate an API token in Strapi:

1. Start the Strapi server:
```bash
cd cms
npm run develop
```

2. Access the Strapi Admin Panel:
   - Navigate to http://localhost:1337/admin in your browser.

3. Create an Admin User:
   - If this is your first time running Strapi, you'll be prompted to create an admin account.

4. Generate the API Token:
   - Go to Settings in the sidebar.
   - Under Global Settings, click on API Tokens.
   - Click the Create new API Token button.
   - Name: Provide a name for your token (e.g., Frontend).
   - Token Type: Choose Custom.
   - Permissions: Select the permissions your frontend requires (e.g., find and findOne for your content types).
   - Click Generate.
   - Copy the generated token.

5. Update the Frontend `.env` File:
   - Paste the token into your frontend/.env file:
```env
PUBLIC_STRAPI_API_TOKEN=your_generated_api_token
```

## Advantages over WordPress

### Modern Technology Stack
- **Headless Architecture**: Strapi is a headless CMS, decoupling the backend from the frontend for greater flexibility.
- **Astro's Island Architecture**: Astro delivers zero JavaScript to the browser by default, improving performance.

### Performance and Speed
- **Optimized Frontend**: Astro builds static sites for fast load times and improved SEO.
- **Reduced Bloat**: Full control over what gets included, eliminating unnecessary code.

### Developer Experience
- **Customization**: Tailor the CMS and frontend to your exact needs.
- **Modern Tooling**: Utilize modern JavaScript features and component-based architectures.

### Scalability
- **API-Centric**: Strapi's API-first approach simplifies scaling and integration.
- **Microservices Friendly**: Integrate the CMS into a microservices architecture seamlessly.

### Security
- **Reduced Attack Surface**: Decoupled frontend reduces common web vulnerabilities.
- **Customizable Security Measures**: Implement security best practices tailored to your application.

### Flexibility in Frontend Frameworks
- **Framework Agnostic**: Not tied to a specific frontend technology.

### Content Modeling
- **Flexible Content Types**: Easily create custom content types and fields.
- **Localization and Internationalization**: Built-in support for multiple languages.

### Open Source and Community
- **Active Development**: Both Strapi and Astro are open-source with active communities.
- **Community Plugins and Integrations**: Access a growing ecosystem of plugins.

### Ease of Deployment
- **Static Site Generation**: Deploy the Astro frontend to any static hosting service.
- **Flexible Backend Hosting**: Host your Strapi CMS on various platforms.

### Learning Opportunities
- **Modern Web Development Practices**: Enhance your skill set with current best practices.
- **Customization and Control**: Gain deeper insights into web application development.

## Notes

- **Simultaneous Execution**: Ensure both the CMS and frontend are running for the application to function correctly.
- **Customizing Content Types**: Customize the CMS content types and frontend components as needed.
- **Port Conflicts**: Update configurations if default ports are in use.
- **Production Build**: For production, build and serve both the CMS and frontend appropriately. Refer to the Strapi and Astro documentation for deployment guidance.

## License

This project is licensed under the MIT License.
