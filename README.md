# Top Todo List

A vanilla JavaScript Todo app built with MVP architecture and localStorage.

## Project Overview

This app organizes work into named **projects**, each containing a list of **todos**. The UI is separated from application logic using a Model-View-Presenter pattern.

- `src/index.js` bootstraps the app and wires model, view, presenter, and storage.
- `src/modules/models` contains project and todo data classes.
- `src/modules/view` contains DOM rendering and user interaction logic.
- `src/modules/presenter.js` handles state coordination, event binding, and persistence.
- `src/modules/storage.js` provides localStorage persistence for project/todo state.

## Architecture

The app follows MVP:

- `AppPresenter` connects views and model state.
- `ProjectManager` maintains the list of projects and current selection.
- `ProjectView` renders project sidebar, selection, and create-dialog flow.
- `TodoView` renders todo cards, empty-state messages, and form dialogs.
- `Storage` saves and loads JSON state from localStorage.

## UML Diagram

A separate Mermaid diagram and visualization is available in `project-structure/`.

## Project Structure

```text
.
├── index.html
├── package.json
├── webpack.config.js
├── babel.config.json
├── postcss.config.js
├── src
│   ├── index.js
│   ├── styles.css
│   ├── lib/
│   └── modules/
│       ├── storage.js
│       ├── presenter.js
│       ├── models/
│       │   ├── project.js
│       │   ├── todo.js
│       │   └── todoManager.js
│       └── view/
│           ├── projectView.js
│           └── todoView.js
```

## Dependencies

- `date-fns` for date parsing and formatting.
- `webpack`, `webpack-cli`, and `webpack-dev-server` for bundling and local development.
- `babel-loader` and `@babel/preset-env` for JavaScript transpilation.
- `css-loader`, `style-loader`, `postcss-loader`, `autoprefixer`, and `mini-css-extract-plugin` for CSS bundling.
- `html-webpack-plugin` for HTML templating.

## Run the App

```bash
npm install
npm run build:dev
npm run serve
```

## Notes

- The app uses localStorage so projects and todos persist after refresh.
- Empty startup state is supported: create a project to begin adding todos.


