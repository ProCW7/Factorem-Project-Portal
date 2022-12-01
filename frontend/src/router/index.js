import React from 'react';
import ManageProjectInfo from '../pages/ManageProjectInfo';
import ProjectInfiList from '../pages/ProjectInfiList';
import EditProjectInfo from '../pages/EditProjectInfo';
// Base
import Home from '../pages/home';
import Deleted from '../pages/deleted';
// Signup Signin
import SignUp from '../pages/signup';
import SignIn from '../pages/signin';
// Project Setup
import ProjectSetup from '../pages/ProjectSetup';
import Checkout from '../pages/Checkout';
// Customer List
import ProjectListCustomer from '../pages/ProjectList';
import ItemListCustomer from '../pages/ItemListCustomer';
import QuoteListCustomer from '../pages/QuoteListCustomer';
import QuoteDetailCustomer from '../pages/QuoteDetailCustomer';
import QuotationCustomer from '../pages/QuotationCustomer';
import AcceptedList from '../pages/AcceptedList';
// Supplier List
import ProjectListSupplier from '../pages/ProjectListSupplier';
import ItemListSupplier from '../pages/ItemListSupplier';
import Quotation from '../pages/Quotation';
import QuoteListSupplier from '../pages/QuoteListSupplier';
// Admin List
import Admin from '../pages/Admin';
import UserList from '../pages/UserList';
import AddUser from '../pages/AddUser';
import deletedUser from '../pages/deletedUser';
import ProjectDataList from '../pages/ProjectDataList';
import UpdatedStatusProject from '../pages/UpdatedStatusProject';
import ItemDataList from '../pages/ItemDataList';
import UpdatedStatusItem from '../pages/UpdatedStatusItem';
import QuoteDataList from '../pages/QuoteDataList';
import UpdatedStatusQuote from '../pages/UpdatedStatusQuote';
// ETC
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import App from '../App';


class Index extends React.Component {
  render() {
    return (
      <Router>
        <App>
          <Routes>
            <Route exact path="/" element={<Home/>} />
            {/* Customer List */}
            <Route exact path="/ProjectAddC" element={<ProjectSetup/>} />
            <Route exact path="/ItemDetail" element={<Checkout/>} />
            <Route exact path="/ProjectListC" element={<ProjectListCustomer/>} />
            <Route exact path="/ItemListC" element={<ItemListCustomer/>} />
            <Route exact path="/QuoteListC" element={<QuoteListCustomer/>} />
            <Route exact path="/QuoteDetailC" element={<QuoteDetailCustomer/>} />
            <Route exact path="/QuoteC" element={<QuotationCustomer/>} />
            <Route exact path="/AcceptedC" element={<AcceptedList/>} />
            {/* Supplier List */}
            <Route exact path="/ProjectListS" element={<ProjectListSupplier/>} />
            <Route exact path="/ItemListS" element={<ItemListSupplier/>} />
            <Route exact path="/Quotation" element={<Quotation/>} />
            <Route exact path="/QuoteListS" element={<QuoteListSupplier/>} />
            {/* Amin List */}
            <Route exact path="/Admin" element={<Admin/>} />
            <Route exact path="/UserList" element={<UserList/>} />
            <Route exact path="/AddUser" element={<AddUser/>} />
            <Route exact path="/DeletedUser" element={<deletedUser/>} />
            <Route exact path="/ProjectDataList" element={<ProjectDataList/>} />
            <Route exact path="/UpdatedStatusProjects" element={<UpdatedStatusProject/>} />
            <Route exact path="/ItemDataList" element={<ItemDataList/>} />
            <Route exact path="/UpdatedStatusItem" element={<UpdatedStatusItem/>} />
            <Route exact path="/QuoteDataList" element={<QuoteDataList/>} />
            <Route exact path="/UpdatedStatusQuote" element={<UpdatedStatusQuote/>} />
            {/* <Route exact path="/ProjectInfo/:id" element={<EditProjectInfo/>} />
            <Route exact path="/ProjectInfo" element={<ManageProjectInfo/>} />
            <Route exact path="/ProjectInfo/:id" element={<EditProjectInfo/>} /> */}
          </Routes>
        </App>
          <Routes>
            <Route exact path="/signup" element={<SignUp/>} />
            <Route exact path="/signin" element={<SignIn/>} />
            <Route exact path="/deleted" element={<Deleted/>} />
          </Routes>
      </Router>
    );
  }
}
export default Index;