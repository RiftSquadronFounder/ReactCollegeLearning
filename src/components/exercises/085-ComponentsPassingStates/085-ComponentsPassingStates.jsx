import EmployeeComponent from '../081-ComponentsProps/EmployeeComponent';

function ComponentsPassingStates() {
  const children = [
    {
      id: 0,
      name: 'employee1',
      payment: 200,
    },
    {
      id: 1,
      name: 'employee2',
      payment: 203,
    },
    {
      id: 2,
      name: 'employee3',
      payment: 530,
    },
  ];
  return (
    <div>
      85. ComponentsPassingStates
      <div>
        {children.map((item) => (
          <EmployeeComponent
            key={item.id}
            id={item.id}
            name={item.name}
            payment={item.payment}
          ></EmployeeComponent>
        ))}
      </div>
    </div>
  );
}

export default ComponentsPassingStates;
