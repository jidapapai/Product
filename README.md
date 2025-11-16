# Product Catalog

Prerequisites:

- Node 20+

## Getting Started

To set up the app execute the following commands.

```bash
git clone git@github.com:jidapapai/Product.git
cd Product
npm install
```

## Development Commands

#### Runs the app in the development mode.

To run the app in the development mode execute the following command.

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) to view it in the browser.

#### Builds the app for production mode.

To build the app for production mode execute the following command.

```bash
npm run build
```

It correctly bundles React in production mode and optimizes the build for the best performance.

To preview the app in the production mode execute the following command.

```bash
npm run preview
```

The vite preview command will boot up a local static web server that serves the files from dist at http://localhost:4173. To check if the production build looks OK in your local environment.


#### Type checking

```bash
npm run type-check
```

The type-check command will check the types of the app.

#### Linting
The lint command will check the code style of the app.

```bash
npm run lint
```

To fix the code style of the app execute the following command.

```bash
npm run lint:fix
```

#### Testing
To run the tests execute the following command.

```bash
npm run test
```


## Supported features
- Product List
    - Client-side filtering by catagory, name and in stock
    - Client-side Sorting by name and price
    - Client-side Pagination
- Product Details Modal
- Product Edit Modal

## Trade-offs or assumptions
- This project was created with Vite, and Vite is incompatibility with Jest according to the documentation[https://jestjs.io/docs/getting-started#using-vite], alternative way is to use Vitest and React Testing Library or use `vite-jest`[https://github.com/haoqunjiang/vite-jest] library.
- Since aiming to build a scalable structure, I decided to use `bulletproof-react`[https://reacthandbook.dev/project-standards#file-directory-structures] to reference the file directory structure.

## Anything you'd improve with more time
- Performance analysis and improvement
- Theme customization: for a real project, we should have a theme customization to match the design of the app.
- Storybook: a storybook to document the components would benefit the developer if we have a customized component such as Button, Input, etc.
- Unit tests
- E2E tests
- Implement router with file-based routing: As per my experience using file-based routing, I found it more convenient for development since we don't need to map the routes manually.
- Adding a form library such as react hooks form for to handle the form state




