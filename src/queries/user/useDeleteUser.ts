import { useQueryClient } from '@tanstack/react-query';
import { useMutation } from '@tanstack/react-query';
import userApi from '../../apis/user/userApi';
import { USER } from '../../utils/queryKeys';

const useDeleteUser = () => {
  const queryClient = useQueryClient();
  const { mutate } = useMutation(userApi.deleteUser, {
    onSuccess: async () => {
      await queryClient.invalidateQueries([USER]);
    },
  });
  return { mutate };
};
export default useDeleteUser;
