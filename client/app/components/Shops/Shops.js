import React, { Component } from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as shopsActions from '../../actions/shops';

import Filter from '../Filter/Filter';
import Search from '../Search/Search';
import Sorting from '../Sorting/Sorting';

import ReactTable from 'react-table';
import 'react-table/react-table.css';
import './shops.scss';

class Shops extends Component {
  constructor(props) {
    super(props);

    this.state = {
      shops: [],
      filters: [],
      sorting: [],
      search: [],
      infoParams: {}
    };
    props.actions.getFilterFields();
    props.actions.getSearchFields();
    props.actions.getSortingFields();

    this.getInfo = this.getInfo.bind(this);
    this.onChangeFilter = this.onChangeFilter.bind(this);
    this.onChangeSearch = this.onChangeSearch.bind(this);
    this.onChangeSorting = this.onChangeSorting.bind(this);
  }

  getFilterFields() {
    const filterFields = (this.props.shops && this.props.shops.filterFields) ? this.props.shops.filterFields : [];
    let list = [{value: '', label: ''}];

    filterFields.forEach(element => {
      if (element.name) {
        list.push({value: element.name, label: element.name});
      }
    });
    return list;
  }

  getSearchFields() {
    const searchFields = (this.props.shops && this.props.shops.searchFields) ? this.props.shops.searchFields : [];
    let list = [{value: '', label: ''}];

    searchFields.forEach(element => {
      if (element.name) {
        list.push({value: element.name, label: element.name});
      }
    });
    return list;
  }

  getSortingFields() {
    const sortingFields = (this.props.shops && this.props.shops.sortingFields) ? this.props.shops.sortingFields : [];
    let list = [{value: '', label: ''}];

    sortingFields.forEach(element => {
      if (element.name) {
        list.push({value: element.name, label: element.name});
      }
    });
    return list;
  }

  getShopTabelColumns(fields) {
    // TODO: create different request to take all fields from schema for table
    const sortingFields = (this.props.shops && this.props.shops.sortingFields) ? this.props.shops.sortingFields : [];
    let columns = [];
    sortingFields.map((element) => {
      columns.push({
        Header: element.name,
        accessor: element.name
      });
    });
    return columns;
  }

  getInfo() {
    const filters = this.state.filters;
    const search = this.state.search;
    const sorting = this.state.sorting;
    this.props.actions.getInfo({filters, search, sorting});
  }

  onChangeFilter(index, field, e) {
    const value = e.target.value;
    const newFilters = JSON.parse(JSON.stringify(this.state.filters));
    if (!newFilters[index]) {
      newFilters[index] = {};
    }
    newFilters[index][field] = value;
    this.setState({filters: newFilters});
  }

  onChangeSearch(index, field, e) {
    const value = e.target.value;
    const newSearch = JSON.parse(JSON.stringify(this.state.search));
    if (!newSearch[index]) {
      newSearch[index] = {};
    }
    newSearch[index][field] = value;
    this.setState({search: newSearch});
  }

  onChangeSorting(index, field, e) {
    const value = e.target.value;
    const newSorting = JSON.parse(JSON.stringify(this.state.sorting));
    if (!newSorting[index]) {
      newSorting[index] = {};
    }
    newSorting[index][field] = value;
    this.setState({sorting: newSorting});
  }

  render() {
    const fieldList = this.getFilterFields();
    const searchFields = this.getSearchFields();
    const sortingFields = this.getSortingFields();
    const columns = this.getShopTabelColumns(sortingFields);
    const shops = (this.props.shops && this.props.shops.shops) ? this.props.shops.shops : [];
    let tableRows = 20;

    if (shops.lenght <= 0) {
      tableRows = 1;
    } else if (shops.length < 20) {
      tableRows = shops.length;
    }

    const emptyFilter = {};

    return (
      <div className='shops'>
        <p>Parameters:</p>
        <div className='shops-parameters'>
          <div className='shops-parameters-filters'>
            Filters:
            {this.state.filters.map((filter, index) => {
                return(
                  <Filter
                  onChangeFilter={this.onChangeFilter}
                    index={index}
                    fieldList={fieldList}
                    filter={filter}
                    key={index}
                  />
                );
              })
            }
            <Filter
              onChangeFilter={this.onChangeFilter}
              index={this.state.filters.length}
              fieldList={fieldList}
              key={this.state.filters.length}
            />
          </div>
          <div className='shops-parameters-filters'>
            Search:
            {this.state.search.map((searchParam, index) => {
                return(
                  <Search
                    onChangeSearch={this.onChangeSearch}
                    index={index}
                    fieldList={searchFields}
                    search={searchParam}
                    key={index}
                  />
                );
              })
            }
            <Search
              onChangeSearch={this.onChangeSearch}
              index={this.state.search.length}
              fieldList={searchFields}
              key={this.state.search.length}
            />
          </div>
          <div className='shops-parameters-filters'>
            Sorting:
            {this.state.sorting.map((sortingParam, index) => {
                return(
                  <Sorting
                    onChangeSorting={this.onChangeSorting}
                    index={index}
                    fieldList={sortingFields}
                    sorting={sortingParam}
                    key={index}
                  />
                );
              })
            }
            <Sorting
              onChangeSorting={this.onChangeSorting}
              index={this.state.sorting.length}
              fieldList={sortingFields}
              key={this.state.sorting.length}
            />
          </div>
        </div>
        <button className='shops-get-data' onClick={this.getInfo}>Get shops</button>
        <div id='shops-table'>
          Shops:
          { (shops.length > 0) ?
            <div className='shops-table'>
              <ReactTable
                data={shops}
                columns={columns}
                defaultPageSize={tableRows}
                className='-striped -highlight'
              />
            </div>
          : <div className='shops-empty-data'>No data to display</div>}
        </div>
      </div>
    );
  }
}

export function mapStateToProps(state) {
  return {
    shops: state.shops
  }
}

export function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(shopsActions, dispatch)
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Shops);
