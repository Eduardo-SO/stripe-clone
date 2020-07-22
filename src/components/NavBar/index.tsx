import React from 'react';

import { Company, Developers, Products } from '../Content';
import { DropdownOption } from '../DropdownOption';

import { Container, DropdownStyles } from './styles';

const NavBar: React.FC = () => {
  return (
    <DropdownStyles>
      <Container>
        <ul>
          <li>
            <DropdownOption name="Produtos" content={Company} />
          </li>
          <li>
            <DropdownOption name="Desenvolvedores" content={Developers} />
          </li>
          <li>
            <DropdownOption name="Empresa" content={Products} />
          </li>
        </ul>
      </Container>
    </DropdownStyles>
  );
};

export default NavBar;
