import React from 'react';
import { Section } from '../../components/Section';
import { DataGridTable } from './datagrid';

export const Users = () => {
  return (
    <>
      <Section title="Usuários">
        <div>
          <DataGridTable />
        </div>
      </Section>
    </>
  );
};
