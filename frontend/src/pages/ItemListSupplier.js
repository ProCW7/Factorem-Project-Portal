import React from 'react';
import {useEffect} from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Notification from '../common/Notification';
import Button from '@material-ui/core/Button';
import ConfirmDelete from '../common/ConfirmDelete';
import DeleteIcon from '@material-ui/icons/Delete';
import {Visibility} from '@material-ui/icons';
import AddIcon from '@material-ui/icons/Add'
import format from 'string-format';
import PageBase from './PageBase';
import { Cookies } from 'react-cookie';
import { Link } from 'react-router-dom';
import * as qs from 'query-string';
// DB Conect
import axios from "axios";
import { useNavigate } from 'react-router-dom';


// set up cookies
const cookies = new Cookies();

// Set Step by Item
// Get URI Var
const parsed = qs.parse(window.location.search);
const idProject = parsed['i'];
console.log(idProject);

const CustomTableCell = withStyles(theme => ({
  head: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  body: {
    fontSize: 14,
  },
}))(TableCell);

const styles = theme => ({
  row: {
    '&:nth-of-type(odd)': {
      backgroundColor: theme.palette.background.default,
    },
  },
  button: {
    margin: theme.spacing.unit,
  }
});

export class ProjectListCustomer extends React.Component {

  constructor(props) {
    super(props);
    this.state = { 
      open: false, 
      deleteRecord: false, 
      id: '', 
      pgNo: 1, 
      pageSize: 10, 
      notify: false, 
      message: '', 
      error: false,
      datas: [],
      quot: [],
    }
    this.deleteProjectInfo = this.deleteProjectInfo.bind(this);
    this.deleteAfterConfirmation = this.deleteAfterConfirmation.bind(this);
    this.editProjectInfo = this.editProjectInfo.bind(this);
  }

  deleteProjectInfo(id) {
    this.setState({ deleteRecord: true, id: id });
  }
  editProjectInfo(id) {
    this.props.history.push(`/ProjectInfo/` + id);
  }
  deleteAfterConfirmation(deleteConfirmed) {
    this.setState({ deleteRecord: false });
    if (deleteConfirmed) {
      /* let selectedid =  this.state.id
        Create and call deleteProjectInfo action */
        this.showNotification("Deleted!! Create and call deleteProjectInfo action");
    }
    this.setState({ id: '' });
  }
  showNotification = (msg, err) => {
    if (err)
      this.setState({ notify: true, message: msg, error: true });
    else
      this.setState({ notify: true, message: msg, error: false });
  };

  handleNotificationClosed = () => {
    this.setState({
      notify: false
    });
  };

  componentDidMount() {
    // call api or anything
    this.getProjectListC();
    this.getQuoationS();
  }

  getProjectListC = async () => {
    // Get Data Project
    const response = await axios.get('http://localhost:8080/items/project/approved/'+idProject+'/'+cookies.get('user_id'));
    this.setState({datas: response.data.data})
  }

  getQuoationS = async () => {
    // Get Data Project
    const response = await axios.get('http://localhost:8080/quotation/item/'+cookies.get('user_id'));
    const da = JSON.stringify(response.data.data)
    this.setState({quot: da})

    if(!window.location.hash) {
      window.location = window.location + '#loaded';
      window.location.reload();
    }

    console.log(da)
  }


  render() {
    const { classes } = this.props;
    const { notify, message, error } = this.state;
    

    return (

      <PageBase title="List of Items" navigation="Projects / Items List /">
        <Button variant="contained" color="primary" className={classes.button} component={Link} to="/QuoteListS">
          My Quotation
        </Button>
        <Button variant="contained" color="primary" className={classes.button} component={Link} to="/ProjectListS">
          Project List
        </Button>
        <Table>
          <TableHead>
            <TableRow>
              <CustomTableCell>Name</CustomTableCell>
              <CustomTableCell>Technology</CustomTableCell>
              <CustomTableCell>Material</CustomTableCell>
              <CustomTableCell>Surface Finish</CustomTableCell>
              <CustomTableCell>Quantity</CustomTableCell>
              <CustomTableCell>Quotation status</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {this.state.datas && this.state.datas.map(data => {
              return (
                <TableRow className={classes.row} key={data.name}>
                  <CustomTableCell>{data.name}</CustomTableCell>
                  <CustomTableCell>{data.technology}</CustomTableCell>
                  <CustomTableCell>{data.material}</CustomTableCell>
                  <CustomTableCell>{data.surface_finish}</CustomTableCell>
                  <CustomTableCell>{data.quantity}</CustomTableCell>
                  <CustomTableCell>
                      {!this.state.quot.includes('{"id_item":'+data.items_id) ? (
                        <Button variant="contained" color="secondary"  component={Link} to={"/Quotation?i="+idProject+"&it="+data.items_id}>
                          Quote
                        </Button>
                      ) : this.state.quot.includes('{"id_item":'+data.items_id) ? (
                        <Button variant="outlined" disabled >
                          Quoted 
                        </Button>
                      ) : (null)}
                  </CustomTableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
        <ConfirmDelete resourceHeader="Delete Project Information ?" resourceSubject={format("Do you want to delete project information '{}'?", this.state.id)} onModalClose={this.deleteAfterConfirmation}
          openDeleteDialog={this.state.deleteRecord} />

        <Notification
          notify={notify}
          message={message}
          error={error}
          closed={this.handleNotificationClosed}
        />
      </PageBase>
    );
  }
}

ProjectListCustomer.propTypes = {
  classes: PropTypes.object.isRequired,
};




export default withStyles(styles)(ProjectListCustomer);