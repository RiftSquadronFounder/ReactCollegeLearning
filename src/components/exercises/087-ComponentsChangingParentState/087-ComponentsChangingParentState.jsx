import { useState } from 'react';
import EmployeeComponent from '../081-ComponentsProps/EmployeeComponent';

function ComponentsChangingParentState() {
  const [children, setChildren] = useState([
    {
      id: 0,
      name: 'employee1',
      payment: 200,
      inCart: false,
    },
    {
      id: 1,
      name: 'employee2',
      payment: 203,
      inCart: false,
    },
    {
      id: 2,
      name: 'employee3',
      payment: 530,
      inCart: false,
    },
  ]);
  return (
    <div>
      87. ComponentsChangingParentState
      <table>
        {children.map((item) => (
          <EmployeeComponent
            id={item.id}
            key={item.id}
            name={item.name}
            payment={item.payment}
            inCart={item.inCart}
            cartMethod={(id) => {
              item.inCart = !item.inCart;
              setChildren([...children]);
              console.warn(children);
            }}
          ></EmployeeComponent>
        ))}
      </table>
    </div>
  );
}

export default ComponentsChangingParentState;
