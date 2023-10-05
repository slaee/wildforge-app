import React from 'react';
import PropTypes from 'prop-types';

function Table({ headers, data, actions }) {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          {headers.map((header) => (
            <th scope="col" key={header}>
              {header.toUpperCase()}
            </th>
          ))}
          <th className="text-center">Actions</th>
        </tr>
      </thead>
      <tbody>
        {data.map((row) => (
          <tr key={row.id}>
            {headers.map((header) => (
              <td key={header}>{row[header]}</td>
            ))}
            <td className="text-center">
              {actions.map((action) => (
                <button
                  type="btn"
                  className="btn btn-link btn-sm"
                  key={action.id}
                  onClick={() => action.handler(row)}
                  style={action.style}
                >
                  {action.label}
                </button>
              ))}
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

Table.propTypes = {
  headers: PropTypes.arrayOf(PropTypes.string).isRequired,
  data: PropTypes.arrayOf(PropTypes.object).isRequired,
  actions: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.number.isRequired,
      label: PropTypes.string.isRequired,
      handler: PropTypes.func.isRequired,
    })
  ).isRequired,
};

export default Table;
