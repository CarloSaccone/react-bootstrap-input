import React from "react";
import isEmpty from "lodash/isEmpty";
const List = ({ items = [] }) => {
  const children = items.map((item, index) => {
    return (
      <tr key={item.name + index}>
        <td>{item.name}</td>
        <td>{item.email}</td>
        <td>{item.salary}</td>
      </tr>
    );
  });

  if (isEmpty(items)) {
    return <p>There are no items for selected filter!</p>;
  }
  return (
    <table className="table table-striped">
      <thead className="thead-dark">
        <tr>
          <th>Name</th>
          <th>Email</th>
          <th>Salary</th>
        </tr>
      </thead>
      <tbody>{children}</tbody>
    </table>
  );
};

export default List;
