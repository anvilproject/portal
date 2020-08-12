/*
 * The AnVIL
 * https://www.anvilproject.org
 *
 * The AnVIL - data dashboard component.
 * Use of this component within markdown is possible.
 * Use the tag <data-dashboard></data-dashboard>.
 */

// Core dependencies
import React from "react";

// App dependencies
import DataSearch from "../data-search/data-search";
import DataSummary from "../data-summary/data-summary";
import DataWorkspaces from "../data-workspaces/data-workspaces";
import {DashboardWorkspaceStaticQuery} from "../../hooks/dashboard-workspace-query";
import ProviderDashboardFilter from "../provider-dashboard-filter/provider-dashboard-filter";
import * as DashboardSearchService from "../../utils/dashboard/dashboard-search.service";

function DataDashboard() {

    const workspacesQuery = DashboardWorkspaceStaticQuery();
    const facetsByTerm = DashboardSearchService.getDashboardFacetsByTerm(workspacesQuery);
    const checkboxGroups = DashboardSearchService.buildDashboardCheckboxesByFacet(facetsByTerm);
    const setOfSearchGroups = DashboardSearchService.getDashboardSetOfSearchGroups();
    const setOfTerms = DashboardSearchService.getDashboardSetOfTerms(facetsByTerm);

    return (
        <ProviderDashboardFilter
            checkboxGroups={checkboxGroups}
            facetsByTerm={facetsByTerm}
            setOfSearchGroups={setOfSearchGroups}
            setOfTerms={setOfTerms}
            workspacesQuery={workspacesQuery}>
            <DataSearch/>
            <DataSummary/>
            <DataWorkspaces/>
        </ProviderDashboardFilter>
    )
}

export default DataDashboard;
