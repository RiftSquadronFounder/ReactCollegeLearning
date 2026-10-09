import EmployeeComponent from '../081-ComponentsProps/EmployeeComponent';

function ComponentsChildLoop() {
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
  ].map((item) => {
    return (
      <EmployeeComponent
        name={item.name}
        payment={item.payment}
      ></EmployeeComponent>
    );
  });
  return (
    <div>
      84. ComponentsChildLoop
      <div>{children}</div>
    </div>
  );
}

export default ComponentsChildLoop;
