import React from 'react';
import { OrderType } from '../../../../types/order';
import { orderStatusDictionary } from '../../../../utils/dictionaries/orderStatus';
import { cylinderStatusDictionary } from '../../../../utils/dictionaries/cylinderStatus';
import { gasStatusDictionary } from '../../../../utils/dictionaries/gasStatus';

interface ModalViewOrderProps {
  order: OrderType | null;
}

export const ModalViewOrder = ({ order }: ModalViewOrderProps) => {
  if (!order) return <p>Pedido não encontrado.</p>;

  return (
    <div className="p-6 max-h-[400px] overflow-y-auto flex flex-col gap-8">
      <h2 className="text-3xl font-bold text-center">Detalhes do Pedido</h2>

      {/* Linha 1: Pedido + Cliente */}
      <div className="flex flex-col md:flex-row gap-6">
        <div className="pb-4">
          <h3 className="text-xl font-semibold mb-2">Informações do Pedido</h3>
          <section className="flex flex-col items-start border rounded-lg h-full p-4 shadow-md">
            <p>
              <strong>ID:</strong> {order.id}
            </p>
            <p>
              <strong>Data:</strong>{' '}
              {new Date(order.orderDate).toLocaleDateString()}
            </p>
            <p>
              <strong>Status:</strong>{' '}
              {orderStatusDictionary[order.orderStatus]}
            </p>
            <p>
              <strong>Tipo de operação:</strong>{' '}
              {order.switchType === 'lending' ? 'Empréstimo' : order.switchType}
            </p>
            <p>
              <strong>Valor Total:</strong> R${' '}
              {Number(order.totalPrice).toFixed(2)}
            </p>
          </section>
        </div>

        <div className="flex flex-col md:flex-row gap-6">
          <div className="pb-4">
            <h3 className="text-xl font-semibold mb-2">Cliente</h3>
            <section className="flex h-full flex-col items-start border rounded-lg p-4 shadow-md">
              <p>
                <strong>Nome:</strong> {order.client.name}
              </p>
              <p>
                <strong>Email:</strong> {order.client.email}
              </p>
              <p>
                <strong>Endereço:</strong>{' '}
                {`${order.client.street}, ${order.client.streetNumber} ${order.client.complement || ''}`}
              </p>
              <p>
                <strong>CEP:</strong> {order.client.zipcode}
              </p>
              <p>
                <strong>CNPJ:</strong> {order.client.cnpj}
              </p>
              <p>
                <strong>Telefone:</strong> ({order.client.ddd}){' '}
                {order.client.cellphone}
              </p>
            </section>
          </div>
        </div>
      </div>

      {/* Linha 3: Cilindros */}
      {order.orderCylinderControl.length > 0 && (
        <div className="flex w-full flex-col">
          <h3 className="text-xl font-semibold mb-4">Cilindros</h3>
          <section className="border flex w-full items-start rounded-lg p-4 shadow-md">
            <div className="flex flex-wrap gap-4">
              {order.orderCylinderControl.map((item) => (
                <div
                  key={item.id}
                  className="border flex p-3 rounded w-full flex-col items-start"
                >
                  <p>
                    <strong>Tamanho:</strong>{' '}
                    {item.cylinderControl.cylinderType.size}m³
                  </p>
                  <p>
                    <strong>Status do cilindro:</strong>{' '}
                    {
                      cylinderStatusDictionary[
                        item.cylinderControl.cylinderStatus
                      ]
                    }
                  </p>
                  <p>
                    <strong>Status do gás:</strong>{' '}
                    {gasStatusDictionary[item.cylinderControl.gasStatus]}
                  </p>
                  <p>
                    <strong>Preço:</strong> R$
                    {item.cylinderControl.cylinderType.clientPrice[0]?.price ||
                      'N/A'}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>
      )}
    </div>
  );
};
