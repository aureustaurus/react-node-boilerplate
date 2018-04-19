import React from 'react';

const Search = (params) => {
  const {
    onChangeSearch,
    index = 0,
    fieldList = [],
    search = {}
  } = params;
  let searchValue =  '';
  if (search.field) {
    searchValue = search.field;
  } else if (fieldList[0] && fieldList[0].value) {
    searchValue = search.field;
  }

  const value = search.value ? search.value : '';

  try {
    return (
      <div>
        <select onChange={onChangeSearch.bind(this, index, 'field')} value={searchValue}>
          {fieldList.map((field) => {
            return(
              <option value={field.value} key={field.value}>
                {field.value}
              </option>
            );
          })}
        </select>
        <input type='text' onChange={onChangeSearch.bind(this, index, 'value')}  value={value} />
      </div>
    );
  } catch(err) {
    console.log(err.message);
    return null;
  }
}

export default Search;
