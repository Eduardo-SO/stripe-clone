import React from 'react';

import { Company, Developers, Products } from '../Content';
import { DropdownOption, DropdownProvider } from '../DropdownOption';

import { Container, DropdownStyles } from './styles';

const NavBar: React.FC = () => {
  return (
    <DropdownProvider>
      <DropdownStyles>
        <Container>
          <ul>
            <li>
              <DropdownOption name="Produtos">
                <Company />
              </DropdownOption>
            </li>
            <li>
              <DropdownOption name="Desenvolvedores">
                <Developers />
              </DropdownOption>
            </li>
            <li>
              <DropdownOption name="Empresa">
                <Products />
              </DropdownOption>
            </li>
          </ul>
        </Container>
      </DropdownStyles>
    </DropdownProvider>
  );
};

export default NavBar;
