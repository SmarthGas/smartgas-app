import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Section } from '../../components/Section';
import { SupplierType } from '../../types/supplier';
import api from '../../lib/api';
import { SupplierPrices } from './supplierPrices';

export const Supplier = () => {
  const { supplierId } = useParams();

  const [supplier, setSupplier] = useState<SupplierType>();

  const supplierFieldsEnum: { [key: string]: string } = {
    id: 'ID',
    name: 'Nome',
    email: 'Email',
    cnpj: 'CNPJ',
    street: 'Rua',
    streetNumber: 'Número',
    complement: 'Complemento',
    zipcode: 'CEP',
    ddd: 'DDD',
    cellphone: 'Celular',
  };

  const getSupplier = async () => {
    console.log('getSupplier');
    try {
      const { data } = await api.get<SupplierType>(`/supplier/${supplierId}`);
      console.log(data);
      setSupplier({
        id: data.id,
        name: data.name,
        email: data.email,
        cnpj: data.cnpj,
        street: data.street,
        streetNumber: data.streetNumber,
        zipcode: data.zipcode,
        ddd: data.ddd,
        cellphone: data.cellphone,
        complement: data.complement,
      });
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getSupplier();
  }, []);

  console.log('render page');

  return (
    <>
      {supplierId && (
        <Section title="Fornecedor" backButton>
          <div className="flex flex-col gap-10">
            <div className="flex w-full text-cream-100 gap-10 flex-wrap pt-10">
              {supplier &&
                Object.entries(supplier).map(
                  ([key, value]) =>
                    key &&
                    value && (
                      <div key={key} className="flex gap-2">
                        <span className="font-bold text-xs">{`${supplierFieldsEnum[key]}:`}</span>
                        <span className="text-xs">{value}</span>
                      </div>
                    )
                )}
            </div>
            <div className="flex w-full border border-cream-100/50" />
            <div className="flex flex-col gap-4">
              <SupplierPrices supplierId={supplierId} />
            </div>
          </div>
        </Section>
      )}
    </>
  );
};
