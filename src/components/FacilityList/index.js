import React, {Component} from 'react';
import PropTypes from 'prop-types';

import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
} from '@material-ui/core';

import {

} from '@material-ui/icons';

/**
 * The FacilityList component displays the facilities as a list and allows
 * selecting them to display some information.
 */
class FacilityList extends Component {

  /**
   * Creates a new instance of FacilityList
   * @param {Object} props
   */
  constructor(props) {

    super(props);
    this.state = {
      order: 0,
      orderBy: 0,
    };

  }

  /**
   * Renders the component.
   * @return {JSX}
   */
  render() {

    return (
      <Paper id='facility-list' className='spacing'>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>
                Facility
              </TableCell>
              <TableCell>
                Users
              </TableCell>
              <TableCell>
                Current Bookings
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            <TableRow>
              <TableCell>
                Burnham
              </TableCell>
              <TableCell>
                3
              </TableCell>
              <TableCell>
                0
              </TableCell>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    );

  }

}

FacilityList.propTypes = {
  onSelect: PropTypes.func,
};

export default FacilityList;
