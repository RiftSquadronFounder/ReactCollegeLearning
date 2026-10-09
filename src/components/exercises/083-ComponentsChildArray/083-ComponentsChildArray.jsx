import EmployeeComponent from '../081-ComponentsProps/EmployeeComponent';

function ComponentsChildArray() {
  const children = [
    {
      name: 'employee1',
      payment: 200,
    },
    {
      name: 'employee2',
      payment: 203,
    },
    {
      name: 'employee3',
      payment: 530,
    },
  ];
  return (
    <div>
      83. ComponentsChildArray
      <table>
        {children.map((item) => (
          <EmployeeComponent
            name={item.name}
            payment={item.payment}
          ></EmployeeComponent>
        ))}
      </table>
    </div>
  );
}

export default ComponentsChildArray;
