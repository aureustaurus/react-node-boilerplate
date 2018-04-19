import React from 'react';

const Filter = (params) => {
  const {
    onChangeFilter,
    index = 0,
    fieldList = [],
    filter = {}
  } = params;
  let fieldValue =  '';
  if (filter.field) {
    fieldValue = filter.field;
  } else if (fieldList[0] && fieldList[0].value) {
    fieldValue = filter.field;
  }

  const value = filter.value ? filter.value : '';

  const conditions = ['', '<', '>', '<=', '>=', '==', '!='];
  const conditionValue = filter.condition ? filter.condition : conditions[0];

  try {
    return (
      <div>
        <select onChange={onChangeFilter.bind(this, index, 'field')} value={fieldValue}>
          {fieldList.map((field) => {
            return(
              <option value={field.value} key={`${index}-${field.value}`}>
                {field.value}
              </option>
            );
          })}
        </select>
        <select onChange={onChangeFilter.bind(this, index, 'condition')} value={conditionValue}>
          {conditions.map((condition) => {
            return(
              <option value={condition} key={`${index}-${condition}`}>
                {condition}
              </option>
            );
          })}
        </select>
        <input type='text' onChange={onChangeFilter.bind(this, index, 'value')}  value={value} />
      </div>
    );
  } catch(err) {
    console.log(err.message);
    return null;
  }
}

export default Filter;