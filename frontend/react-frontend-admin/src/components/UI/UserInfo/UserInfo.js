import React from 'react';
import { NavLink } from 'react-router-dom';
import { Avatar, Menu, Dropdown, Icon } from 'antd';
import userPicture from '../../../assets/images/user-icon.png';

const UserInfo = props => {
  const menu = (
    <Menu>
      <Menu.Item key="0">
        <NavLink to="/admin/info">Detail Admin</NavLink>
      </Menu.Item>
      <Menu.Item key="1">
        <NavLink to="/admin/logout">Logout</NavLink>
      </Menu.Item>
    </Menu>
  );
  console.log(props);
  return (
    <div>
      <Avatar
        style={{ verticalAlign: 'middle', marginLeft: '10px' }}
        size="default"
        // src="https://lh3.googleusercontent.com/a-/AAuE7mA1gqigPtm9XdvBTY3BDf3KOJ9_0Gx3nokjWgQV=s96-c"
        src={props.picture ? props.picture : userPicture}
      />

      <Dropdown
        overlay={menu}
        trigger={['click']}
        style={{ verticalAlign: 'middle', marginRight: '10px' }}
      >
        <NavLink className="ant-dropdown-link" to="#">
          {props.name ? props.name : 'Admin'}
          <Icon type="down" />
        </NavLink>
      </Dropdown>
    </div>
  );
};

export default UserInfo;
