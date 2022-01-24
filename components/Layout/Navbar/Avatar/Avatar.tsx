import { UserOutlined } from '@ant-design/icons';
import Avatar from 'antd/lib/avatar/avatar';
import { AuthState } from '../../../../lib/redux/auth/authSlice';

interface AvatarSectionProps {
  user: AuthState['user'];
}

export const AvatarSection = ({ user }: AvatarSectionProps) => {
  return (
    <div style={{ display: 'flex', alignItems: 'center' }}>
      <Avatar
        icon={<UserOutlined />}
        src={user?.avatar ? `/api/media/thumbnail/${user?.avatar}` : undefined}
      />
      <b style={{ marginLeft: 10 }}>{user?.firstname} {user?.lastname}</b>
    </div>
  );
};
