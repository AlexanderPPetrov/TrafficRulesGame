Backbone.widget({

    model: {},


    events: {

    },
    listen: {
        'DISPLAY_INFO': 'displayInfoText'
    },

    loaded: function () {
        this.render();
    },

    render: function () {

    },

    displayInfoText: function (data) {
        console.log('[Info Container] Display info text: ', data)
    }


}, ['map']);