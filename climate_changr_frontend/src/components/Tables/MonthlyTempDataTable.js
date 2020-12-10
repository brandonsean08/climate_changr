import React from 'react';
import BootstrapTable from 'react-bootstrap-table-next';

const temperatureDataTableColumns = [{
    dataField: 'country.ISO3',
    text: 'Id'
  }, {
    dataField: 'country.name',
    text: 'Country'
  }, {
    dataField: 'Actual Temp (average 1991-2020)',
    text: 'country.temperatures.averages.January'
  }];

const MonthlyTempDataTable = () => {
    return (
        <div>
            
        </div>
    );
};

export default MonthlyTempDataTable;