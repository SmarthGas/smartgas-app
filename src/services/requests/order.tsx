import api from '../api';

interface PostOrderParams {
  body: {
    clientId: string;
    cylinderControlIds: string[];
    switchType: string;
    clientSignature: string;
    userSignature: string;
  };
}
interface PostOrderResponse {
  message: string;
  order: {
    id: string;
    clientId: string;
    userId: string;
    orderDate: string;
    orderStatus: string;
    switchType: string;
    clientSignature: string;
    userSignature: string;
    createdAt: string;
    updatedAt: string;
    cylinderTypeId: any;
  };
}

export const postOrder = async ({
  body,
}: PostOrderParams): Promise<PostOrderResponse | undefined> => {
  try {
    const { data: response } = await api.post<PostOrderResponse>('/order', {
      ...body,
    });

    return response as PostOrderResponse;
  } catch (error) {
    console.error(error);
  }
};
