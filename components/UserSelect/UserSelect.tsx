import { useEffect, useState } from 'react';
import { Select, SelectProps } from 'antd';
import axios from 'axios';
import { User } from '../../lib/models/UserModel';
import { APIQuery } from '../../lib/types/APIQuery';


const apiEndPoint = '/api/user';

export default function UserSelect({ ...props }: SelectProps) {
  const [items, setItems] = useState<APIQuery<User>[]>([]);

  useEffect(() => {
    axios(`${apiEndPoint}/search`).then((res) => {
      const idList = (res.data as APIQuery<User>[]).map((x) => x._id);
      if (props.defaultValue) {
        if (idList.includes(props.defaultValue)) {
          setItems(res.data);
        } else {
          axios(`${apiEndPoint}/${props.defaultValue}`).then((r) => {
            setItems([r.data, ...res.data]);
          });
        }
      } else {
        setItems(res.data);
      }
    });
  }, [props.defaultValue]);

  return (
    <Select
      {...props}
      showSearch
      size="large"
      filterOption={false}
      onSearch={handleSearch}
    >
      {items.map((item) => (
        <Select.Option
          key={item._id}
          value={item._id}
        >
          {item.username}
        </Select.Option>
      ))}
    </Select>
  );

  function handleSearch(value: string) {
    axios(`${apiEndPoint}/search/${value}`).then((res) => {
      setItems(res.data);
    });
  }
}
