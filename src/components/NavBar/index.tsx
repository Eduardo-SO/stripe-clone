import React from 'react';

import { DropdownOption } from '../DropdownOption';

import { Container, DropdownStyles } from './styles';

const NavBar: React.FC = () => {
  return (
    <DropdownStyles>
      <Container>
        <ul>
          <li>
            <DropdownOption name="Produtos" content={() => <h1>Sub</h1>} />
          </li>
          <li>
            <DropdownOption
              name="Desenvolvedores"
              content={() => <h1>Sub</h1>}
            />
          </li>
          <li>
            <DropdownOption name="Empresa" content={() => <h1>Sub</h1>} />
          </li>
        </ul>
      </Container>
    </DropdownStyles>
  );
};

export default NavBar;
