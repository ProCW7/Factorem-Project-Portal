import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';

const styles = {
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginLeft: -18,
    marginRight: 10,
  }
};

class Header extends React.Component {

  render() {
    const { menuStyle, handleChangeRequestNavDrawer,classes } = this.props;
    const style = {
      appBar: {
        position: 'fixed',
        top: 0,
        overflow: 'hidden',
        maxHeight: 57
      },
    };

    return (
      <div className={classes.root}>
        <AppBar position="static" style={{...menuStyle, ...style.appBar}} >
          <Toolbar variant="dense">
            <Typography variant="h6" color="inherit" component={Link} to="/"  style={{ textDecoration: "none" }}>
              Projects Portal
          </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
Header.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(Header);