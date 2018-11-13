import React from 'react';
import PropTypes from 'prop-types';
import styles from './Charts.scss';

import { Card, CardHeader, CardBody } from 'reactstrap';

import axios from 'axios';

import BasicLayout from 'components/BasicLayout';
import UsageCountChart from 'components/UsageCountChart';

class Charts extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isLoading: true,
      userWords: []
    };

    this.fetchUserWords = this.fetchUserWords.bind(this);
  }

  componentDidMount() {
    this.fetchUserWords();
  }

  fetchUserWords() {
    axios.get('/api/v1/user_words/date').then(res => {
      if (res.data.success) {
        this.setState({
          isLoading: false,
          userWords: res.data.data
        });

        this.paintChart(res.data.data);

      } else {

      }
    });
  }



  render() {
    return (
      <BasicLayout>
        <div className={styles.Charts}>
          <Card>
            <CardHeader>
              Hourly usage
            </CardHeader>
            <CardBody style={{ height: '348px' }}>
              {this.state.isLoading || <UsageCountChart userWords={this.state.userWords} />}
            </CardBody>
          </Card>
        </div>
      </BasicLayout>
    );
  }
}

Charts.propTypes = {};
Charts.defaultProps = {};

export default Charts;
