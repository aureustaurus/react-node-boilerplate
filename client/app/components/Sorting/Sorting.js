import React from 'react';

const Sorting = (params) => {
  const {
    onChangeSorting,
    index = 0,
    fieldList = [],
    sorting = {}
  } = params;
  let sortingValue =  '';
  if (sorting.field) {
    sortingValue = sorting.field;
  } else if (fieldList[0] && fieldList[0].value) {
    sortingValue = sorting.field;
  }

  const ordering = sorting.ordering ? sorting.ordering : 0;
  const directionList = ['', 'asc', 'desc']

  try {
    return (
      <div>
        <select key='sorting-field' onChange={onChangeSorting.bind(this, index, 'field')} value={sortingValue}>
          {fieldList.map((field) => {
            return(
              <option value={field.value} key={field.value}>
                {field.value}
              </option>
            );
          })}
        </select>
        <select key='sorting-direction' onChange={onChangeSorting.bind(this, index, 'direction')} value={sortingValue}>
          {directionList.map((direction) => {
            return(
              <option value={direction} key={direction}>
                {direction}
              </option>
            );
          })}
        </select>
        <input type='number' min={0} onChange={onChangeSorting.bind(this, index, 'ordering')}  value={ordering} />
      </div>
    );
  } catch(err) {
    console.log(err.message);
    return null;
  }
}

export default Sorting;