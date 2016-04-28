/**
 * Application config file
 * State configuration goes here
 */

var STATECONFIG = {


    fmcg: {

        url: "/fmcg-channel",
        templateUrl: "fmcg-channel.html",
        controller: "FmcgCtrl",
        controllerAs: "fmcg"
    },

    category: {

        url: "/category-channel",
        templateUrl: "category-channel.html",
        controller: "CatchCtrl",
        controllerAs: "chcat"

    },

    format: {

        url: "/sub-channel",
        templateUrl: "sub-channel.html",
        controller: "SubchCtrl",
        controllerAs: "chsub"

    },


    insights: {

        url: "/channel-insights",
        templateUrl: "channel-insights.html",
        controller: "InsightsCtrl",
        controllerAs: "inchart"

    },


    customers_listing: {

        url: "/customers-listing",
        templateUrl: "customers-listing.html",
        controller: "custLevelCtrl",
        controllerAs: "custLvl"

    },

    customer_insights: {

        url: "/customer-insights",
        templateUrl: "customer-profit-insight.html",
        controller: "CustInsightCtrl",
        controllerAs: "cusIns"
    },

    adjust_customer: {

        url: "/adjust_customer",
        //templateUrl: "./templates/customer/adjust-customer-prioritisation.html",
        templateUrl: "adjust-customer-prioritisation.html",
        controller: "CustPriorCtrl",
        controllerAs: "cpr"

    },

    resource_input: {

        url: "/resource_input",
        templateUrl: "bold-resource-choices-input.html",
        controller: "ResIoCtrl",
        controllerAs: "rio"


    },

    resource_choices: {

        url: "/resource-choices",
        templateUrl: "bold-resource-choices.html",
        controller: "ResCtrl",
        controllerAs: "res"

    },
    resource_output: {

        url: "/resource_output",
        templateUrl: "bold-resource-choices-output.html",
        controller: "ResOutCtrl",
        controllerAs: "reso"


    }


}
