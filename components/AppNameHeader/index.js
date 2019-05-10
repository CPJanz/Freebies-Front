import React from "react";
import {Header, Body} from "native-base";

import AppName from "../AppName"

export default class AppNameHeader extends React.Component {
    render() {
        return (
            <Header>
                <Body >
                    <AppName style={{height: 80}} />
                </Body>
            </Header>
        );
    }
}
