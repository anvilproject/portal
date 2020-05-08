/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data table component.
 */

// Core dependencies
import React from "react";

// App dependencies
import ClickHandler from "../click-handler/click-handler";
import * as DashboardTableService from "../../utils/dashboard-table.service";
import * as AnvilGTMService from "../../utils/anvil-gtm/anvil-gtm.service";
import * as DOMService from "../../utils/dom.service";

// Styles
import compStyles from "./data-table.module.css";

let classNames = require("classnames");

class DataTable extends React.Component {

    redirect = (linkTo, linkText) => {

        window.open(linkTo);

        // Track click to external sites
        if ( DOMService.isHrefExternal(linkTo) || DOMService.isMailTo(linkTo) ) {
            AnvilGTMService.trackExternalLinkClicked(linkTo, linkText);
        }
    };

    render() {
        const {className, tableHeaders, tableRows} = this.props,
            summaryTable = className === compStyles.summary;

        const HeaderCell = (props) => {

            const {column} = props,
                headerCell = DashboardTableService.switchDisplayColumnName(column),
                rightAlign = DashboardTableService.cellAlignment(column);

            return (
                <th className={classNames({[compStyles.right]: rightAlign})}>{headerCell}</th>
            )
        };

        const RowCell = (props) => {

            const {children, column, summary} = props,
                data = DashboardTableService.formatValue(children, column),
                linkedTo = DashboardTableService.getCellUrl(children, column, summary),
                rightAlign = DashboardTableService.cellAlignment(column);

            return (
                linkedTo ? <ClickHandler className={classNames({[compStyles.right]: rightAlign}, compStyles.link)}
                                         clickAction={() => this.redirect(linkedTo, data)}
                                         tag={"td"}
                                         label={data}>{data}</ClickHandler> :
                    <td className={classNames({[compStyles.right]: rightAlign})}>{data}</td>
            )
        };

        const TableRow = (props) => {

            const {order, row, summary} = props,
                totalRow = row.program === "Total";

            return (
                <tr className={classNames(compStyles.row, {[compStyles.total]: totalRow})}>
                    {order.map((key, c) =>
                        <RowCell key={c}
                                 column={key}
                                 summary={summary}>{row[key]}</RowCell>)}
                </tr>
            )
        };

        return (
            <div className={classNames(compStyles.wrapper, className)}>
                <table>
                    <thead>
                    <tr className={compStyles.header}>
                        {tableHeaders.map((tableHeader, h) => <HeaderCell key={h} column={tableHeader}/>)}
                    </tr>
                    </thead>
                    <tbody>
                    {tableRows.map((tableRow, r) => <TableRow key={r}
                                                              order={tableHeaders}
                                                              row={tableRow}
                                                              summary={summaryTable}/>)}
                    </tbody>
                </table>
            </div>
        );
    }
}

export default (props) => {

    return (
        <DataTable {...props}/>
    )
}
