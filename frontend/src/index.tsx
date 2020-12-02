import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
// import App from "./App_bk";
import { store } from "./app/store";
import { Provider } from "react-redux";
import * as serviceWorker from "./serviceWorker";
// import { Route, BrowserRouter } from "react-router-dom";
import Auth from "./features/auth/Auth";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import ProgressIndex from "./features/progress/ProgressIndex";
import CompanyIndex from "./features/company/CompanyIndex";
import CompanyReservationIndex from "./features/company_reservation/CompanyReservationIndex";
import UserIndex from "./features/user/UserIndex";
import DocktorIndex from "./features/docktor/DocktorIndex";
import CourseIndex from "./features/course/CourseIndex"

// import ProductPage from "./components/pages/ProductPage";
// import HomePage from "./components/pages/HomePage";

ReactDOM.render(
  <Provider store={store}>
    <Router>
      <Switch>
        <Route path="/" component={ProgressIndex} exact />
        <Route path="/companies" component={CompanyIndex} exact />
        <Route
          path="/company_reservations"
          component={CompanyReservationIndex}
          exact
        />
        <Route path="/users" component={UserIndex} exact />
        <Route path="/docktors" component={DocktorIndex} exact />
        <Route path="/courses" component={CourseIndex} exact />
        <Route path="/auth" component={Auth} exact />

        {/* <Route path="/products" component={ProductPage} exact />
        <Route path="/" component={HomePage} exact /> */}
      </Switch>
    </Router>
  </Provider>,
  document.getElementById("root")
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
