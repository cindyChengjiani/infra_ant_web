/**
 * @Author: CJN
 * @Date: 2018/8/23
 * @Description: *
 */
import React, {Fragment, PureComponent} from 'react';
import PropTypes from 'prop-types';
import {Layout, Icon, message} from 'antd';
import DocumentTitle from 'react-document-title';
import {connect} from 'dva';
import {Route, Redirect, Switch, routerRedux} from 'dva/router';
import {ContainerQuery} from "react-container-query";
import GlobalHeader from '../components/GlobalHeader';
import SiderMenu from '../components/SiderMenu/SiderMenu';
import classNames from 'classnames';
import logo from '../logo.svg';
import {getMenuData} from "../common/menu";
import pathToRegexp from "path-to-regexp";
import {enquireScreen} from "enquire-js";

const {Content, Header} = Layout;
const query = {
    'screen-xs': {
        maxWidth: 575,
    },
    'screen-sm': {
        minWidth: 576,
        maxWidth: 767,
    },
    'screen-md': {
        minWidth: 768,
        maxWidth: 991,
    },
    'screen-lg': {
        minWidth: 992,
        maxWidth: 1199,
    },
    'screen-xl': {
        minWidth: 1200,
        maxWidth: 1599,
    },
    'screen-xxl': {
        minWidth: 1600,
    },
};
let isMobile;
enquireScreen(b => {
    isMobile = b;
});

@connect(({ user, global = {}, loading }) => ({
    collapsed: global.collapsed
}))

export default class BasicLayout extends PureComponent {
    getPageTitle() {
        const {routerData, location} = this.props;
        const {pathname} = location;
        let title = '运维管理';
        let currRouterData = null;
        for (const key in Object.keys(routerData)) {
            if (pathToRegexp(key).test(pathname)) {
                currRouterData = routerData[key];
                break;
            }
        }
        if (currRouterData && currRouterData.name) {
            title = `${currRouterData.name} - 运维管理`;
        }
        return title;
    }

    state = {
        isMobile,
    };
    handleMenuCollapse = collapsed => {
        const {dispatch} = this.props;
        dispatch({
            type: 'global/changeLayoutCollapsed',
            payload: collapsed,
        });
    };

    render() {

        const {
            currentUser,
            collapsed,
            fetchingNotices,
            notices,
            routerData,
            match,
            location,
        } = this.props;

        const {isMobile: mb} = this.state;
        const layout = (
            <Layout>
                <SiderMenu
                    logo={logo}
                    menuData={getMenuData()}
                    collapsed={collapsed}
                    location={location}
                    isMobile={mb}
                    onCollapse={this.handleMenuCollapse}
                />
                <Layout>
                    <Header style={{padding: 0}}>
                        <GlobalHeader
                            logo={logo}
                            currentUser={currentUser}
                            fetchingNotices={fetchingNotices}
                            notices={notices}
                            collapsed={collapsed}
                            isMobile={mb}
                            onCollapse={this.handleMenuCollapse}
                        />
                    </Header>
                    <Content style={{margin: '24px 24px 0', height: '100%'}}>
                        <Switch>

                        </Switch>
                    </Content>
                </Layout>
            </Layout>
        );

        return (
            <DocumentTitle title={this.getPageTitle()}>
                <ContainerQuery query={query}>
                    {params => <div className={classNames(params)}>{layout}</div>}
                </ContainerQuery>
            </DocumentTitle>
        );
    }
}
