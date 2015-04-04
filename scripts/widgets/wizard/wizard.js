Backbone.widget({
    template: false,
    currentStep: 1,

    events: {
        "click .wizard a": "stepClick",
        "click .back-btn": "stepBack",
        "click .next-btn": "stepNext"
    },

    loaded: function() {

        if (this.request().step!=undefined) {
            this.currentStep = this.request().step;
        }

        this.renderTemplate({
            template: 'wizard',
            renderCallback: function() {
                this.loadStep(this.currentStep);
                //this.$el.find('.back-btn').parent().css('visibility','hidden');

                if (this.currentStep == 5) {
                    this.$el.find('.next-btn').text('FINISH');
                    this.$el.find('.next-btn').attr('href','#admin');
                }

                if( this.currentStep == 1 && Backbone.session.alreadyInitialized != true) {
                    $('.confirm-save-modal').attr('tab-index',2);
                    $('.confirm-save-modal').modal('show');

                }
            }
        })
    },

    stepClick: function(e) {
        e.preventDefault();
        var index = $(e.currentTarget).attr('index');
        $('.confirm-save-modal').attr('tab-index',index);

        if( this.currentStep == 1 && Backbone.session.alreadyInitialized != true) {
            $('.confirm-save-modal').modal('show');
        } else {
            Backbone.router.navigate('#wizard/step='+index, true);
        }


    },

    loadStep: function(index) {

        var context = this;

        this.$el.find('.wizard').find('a').removeClass('current');
        $('a[index="'+index+'"]').addClass('current');

        $.ajax({
            url: 'scripts/widgets/wizard/assets/step'+index+'.html',
            success: function(stepHTML) {
                context.$el.find('#step-container').append(stepHTML);
                Backbone.constructor.createWidgetsInEl($('#step-container'))
            }
        });

    },

    stepBack: function(e) {
        e.preventDefault();
        if (this.currentStep>1) {
            this.currentStep--;
        }

        if (this.currentStep < 5) {
            this.$el.find('.next-btn').text('NEXT');
        }

        Backbone.router.navigate('#wizard/step='+this.currentStep, true);

    },

    stepNext: function(e) {
        e.preventDefault();

        if( this.currentStep == 1 && Backbone.session.alreadyInitialized != true) {
            $('.confirm-save-modal').attr('tab-index',2);
            $('.confirm-save-modal').modal('show');

        } else {

            if (this.currentStep < this.$el.find('.wizard').find('a').length) {
                this.currentStep++;
                Backbone.router.navigate('#wizard/step='+this.currentStep, true);
            } else {
                Backbone.router.navigate('#admin', true);
            }

        }


    }


});