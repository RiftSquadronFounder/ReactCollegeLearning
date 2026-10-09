import EmployeeComponent from '../081-ComponentsProps/EmployeeComponent';

function ComponentsChild() {
  let name = 'Ded Maxim';
  let payment = 200;
  return (
    <div>
      82. ComponentsChild
      <EmployeeComponent name={name} payment={payment}></EmployeeComponent>
    </div>
  );
}

export default ComponentsChild;
