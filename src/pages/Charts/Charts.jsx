import React from 'react';
import PropTypes from 'prop-types';
import styles from './Charts.scss';

import axios from 'axios';

import { Row, Col } from 'reactstrap';

import BasicLayout from 'components/BasicLayout';
import HourlyUsageChartCard from 'components/HourlyUsageChartCard';
import StatsCard from 'components/StatsCard';

import moment from 'moment';
import 'react-dates/initialize';
import { DateRangePicker } from 'react-dates';
import 'react-dates/lib/css/_datepicker.css';

class Charts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      userWords: [],
      startDate: moment(),
      endDate: moment(),
    };

    this.fetchUserWords = this.fetchUserWords.bind(this);
    this.handleDatesChange = this.handleDatesChange.bind(this);
  }

  componentDidMount() {
    this.fetchUserWords({
      startDate: this.state.startDate
    });
  }

  handleDatesChange({ startDate, endDate }) {
    this.setState({ startDate, endDate, isLoading: true });
    this.fetchUserWords({ startDate, endDate });
  }

  fetchUserWords({ startDate, endDate }) {
    const params = {
      start: startDate && startDate.format('YYYYMMDD'),
      end: endDate && endDate.format('YYYYMMDD')
    }
    axios.get('/api/v1/user_words/date', { params }).then(res => {
      if (res.data.success) {
        this.setState({
          isLoading: false,
          userWords: res.data.data
        });
      } else {
      }
    });
  }

  render() {
    return (
      <BasicLayout>
        <div className={styles.Charts}>
          <DateRangePicker
            displayFormat="YYYY-MM-DD"
            startDate={this.state.startDate}
            startDateId="start_date_id"
            endDate={this.state.endDate}
            endDateId="end_date_id"
            onDatesChange={this.handleDatesChange}
            focusedInput={this.state.focusedInput}
            onFocusChange={focusedInput => this.setState({ focusedInput })}
            minimumNights={0}
            hideKeyboardShortcutsPanel
          />
          <Row>
            <Col xs="6" sm="4" lg="2">
              <StatsCard label="calls" total={this.state.userWords.length} />
            </Col>
          </Row>
          {this.state.isLoading || <HourlyUsageChartCard userWords={this.state.userWords} />}
        </div>
      </BasicLayout>
    );
  }
}

Charts.propTypes = {};
Charts.defaultProps = {};

export default Charts;
