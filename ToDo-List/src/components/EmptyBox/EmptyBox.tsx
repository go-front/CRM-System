import React from 'react';
import { Empty, Typography } from 'antd';

const EmptyBox: React.FC = () => (
  <Empty
    image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
    styles={{ image: { height: 120 } }}
    description={
      <Typography.Text>
        <p>No Tasks else...</p>
      </Typography.Text>
    }
  ></Empty>
);

export default EmptyBox;
