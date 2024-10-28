import React from 'react';
import { Section } from '../../components/Section';
import { Header } from '../../components/Header';
import { DataGridDemo } from './datagrid';

export const Users = () => {
  return (
    <Section title="Usuários">
      <div>
        <DataGridDemo />
      </div>
    </Section>
  );
};
