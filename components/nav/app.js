import React from 'react'
import { render } from 'react-dom'

export class Nav extends React.Component {
    render() {
        const title = this.props.title;
        return (
            <div className="container-topbar clearfix">
                <div className="ol-grid ol-grid-2 topbar-left clearfix">
                    <a href="" className="topbar-icon">
                        <i className="iconfont"></i>
                    </a>
                </div>
                <div className="ol-grid ol-grid-2 topbar-middle">title</div>
                <div className="ol-grid ol-grid-2 topbar-right clearfix">
                    <a className="topbar-text"></a>
                </div>
            </div>
        )
    }
}