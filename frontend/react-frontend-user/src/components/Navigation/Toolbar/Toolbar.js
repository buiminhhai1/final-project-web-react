import React from 'react';
import classes from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavigationItems from '../NavigationItems/NavigationItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawToggle';
import { Input, Select } from 'antd';

const { Search } = Input;
const { Option } = Select;

const selectSearch = (
    <Select defaultValue="Subjects" style={{ width: 90 }}>
        <Option value="Subjects">Subjects</Option>
        <Option value="Level">Level</Option>
        <Option value="Name">Name</Option>
    </Select>
);

const Toolbar = (props) => (
    <header className={classes.Toolbar}>
        <DrawerToggle clicked={props.drawerToggleClicked} />
        <div className="d-flex align-items-center" style={{ maxHeight: '100%' }}>
            <div className={classes.Logo}>
                <Logo height="45px" />
            </div>
            <Search
                className="ml-3"
                addonBefore={selectSearch}
                placeholder="Find sth..."
                enterButton="Search"
                size="default"
                onSearch={value => console.log(value)}
            />
        </div>
        <nav className={classes.DesktopOnly}>
            <NavigationItems isAuthenticated={props.isAuth} />
        </nav>
    </header>

);

export default Toolbar;