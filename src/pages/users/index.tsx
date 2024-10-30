import React, { useState } from 'react';
import { Section } from '../../components/Section';
import { Header } from '../../components/Header';
import { DataGridTable } from './datagrid';
import { Modal } from '../../components/Modal';
import { Button } from '../../components/Button';
import { Pen, Trash } from '@phosphor-icons/react';
import { GridColDef } from '@mui/x-data-grid';

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
