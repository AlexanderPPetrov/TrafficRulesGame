Backbone.widget({
    template: false,

    model: [],
    rowCount: 4,
    columnCount: 4,

    events: {
        'mouseenter .base-grid' : 'showSelection',
        'mouseleave .base-grid' : 'hideSelection'
    },

    loaded: function () {
        this.render();
    },

    render: function () {
        this.renderTemplate({

            template: 'gridmap',
            data: this.model,
            renderCallback: function () {
                this.setGridSize();
                this.initializeMap();
            }
        })
    },

    setGridSize: function(){
        this.boxSize = Math.floor(this.$el.find('#grid-container').width() / (this.columnCount * 2 + 1));
        this.rowWidthPx = (this.columnCount * 2 + 1)* this.boxSize,
        this.rowHeight = this.boxSize;
    },

    initializeMap: function () {

        Map.generate("grid-container", this.rowCount, this.columnCount, 1);
        $('#grid-container').find('.r').css({'width': this.rowWidthPx, 'height': this.rowHeight});
        $('#grid-container').find('.b, .w').css({
            'width': this.boxSize,
            'height': this.boxSize,
            'background-size': this.boxSize + 'px ' + this.boxSize + 'px'
        });
        $('#grid-container').closest('.white-background').height((this.rowCount*2 )*this.boxSize)

        $('#grid-container').find('.b, .w').addClass('base-grid');
        this.renderScene();

        $('#grid-container').find('.blockMaze').append('<div class="player"></div>');
        $('#grid-container').find('.player').css({
            'width': this.boxSize,
            'height': this.boxSize,
            'top': this.boxSize,
            'left': '0px',
            'background-size': this.boxSize + 'px ' + this.boxSize + 'px'
        });

    },

    renderScene: function(){
        this.$el.find('.w').each(function(){

            var randomGrass = Math.floor((Math.random() * 5) + 1);
            var grass = '<img class="grid-image" src="assets/img/textures/'+ 1 +'.jpg"/>'

            $(this).append(grass);

            var randomHouse = Math.floor((Math.random() * 10) + 1);
            if(randomHouse < 5){
                var houseNumber =  Math.floor((Math.random() * 5) + 1);
                $(this).append('<img class="grid-image house" src="assets/img/houses/h_0'+ houseNumber +'.png"/>');
            }
        })

        this.$el.find('.grid-image').css({'width': this.boxSize, 'height': this.boxSize})

    },

    showSelection: function(e){
        if($(e.currentTarget).find('.grid-image').length > 0){
            $(e.currentTarget).find('.grid-image').append('<div class="base-grid-marker"></div>');
            return;
        }
        $(e.currentTarget).prepend('<div class="base-grid-marker" style="width:100%; height:100%;"></div>')
        this.$el.find('.base-grid-marker').css({'width': this.boxSize, 'height': this.boxSize})
    },

    hideSelection: function(e){
        this.$el.find('.base-grid-marker').remove();

    }




}, ['map']);