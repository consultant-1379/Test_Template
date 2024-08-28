define([
    "jscore/core",
    "text!./SonOmAccordion.html",
    "styles!./SonOmAccordion.less",
    'widgets/InfoPopup'    
], function (core, template, style, InfoPopup) {
    

    var AccordionView = core.View.extend({

        initialise: function(){
            this.createAndAttachInfoPopupToAccordionHeader();
        },

        setInfoPopupContent: function (content) {
            this.infoPopupContent = content;
        },

        afterRender: function () {
            this.title = this.getElement().find('.' + AccordionView.EL_TITLE);
            this.button = this.getElement().find('.' + AccordionView.EL_BUTTON);
            this.content = this.getElement().find('.' + AccordionView.EL_BODY);
            this.header = this.getElement().find('.' + AccordionView.EL_HEADER);
            this._icon = this.getElement().find('.' + AccordionView.EL_ICON);
            this._icon.setModifier('rightArrow', '10px');

            this.contentHeight = 500;
            this.getElement().addEventHandler('accordionHeightChange', this.reCalculateHeight.bind(this));
        },

        reCalculateHeight: function(){
            this.contentHeight = this.content.element.clientHeight;
            this.content.setStyle('max-height', 'none');
        },

        getTemplate: function () {
            return template;
        },
        
        getStyle: function() {
            return style;
        },
        
        getTitle: function () {
            return this.title;
        },

        getButton: function () {
            return this.button;
        },

        getContent: function () {
            return this.content;
        },

        getHeader: function () {
            return this.header;
        },

        getHeaderNumber: function () {
            return this.getElement().find(".eaSonOptManager-wSonOmAccordion-number");
        },

        getHeaderTitle: function () {
            return this.getElement().find(".eaSonOptManager-wSonOmAccordion-title span");
        },

        getInfoPopupHolder: function () {
            return this.getElement().find(".eaSonOptManager-wSonOmAccordion-infoIcon");
        },

        setEvents: function () {
            if (!this._hdrClkEvtId) {
                this._hdrClkEvtId = this.header.addEventHandler('click', this._onHeaderClick, this);
				this.button.addEventHandler('click', this._onHeaderClick, this);
            }
        },

        removeEvents: function () {
            this.header.removeEventHandler(this._hdrClkEvtId);
        },

        createAndAttachInfoPopupToAccordionHeader: function () {
            this.infoPopup = new InfoPopup({
              content: this.infoPopupContent
            });
			//stop event propogation for info pop up.
			this.infoPopup.getElement().addEventHandler("click", function(e) { e.originalEvent.stopPropagation();});
            this.infoPopup.attachTo(this.getInfoPopupHolder());
      },

        _onHeaderClick: function (event) {
			if (this._expanded === true) {
					this.foldBody();
				} else {
					this.expandBody();
				}                
        },

        foldBody: function () {
            this._icon.removeModifier('downArrow');
            this._icon.setModifier('rightArrow', '10px');
            this.button.setAttribute('title', 'Expand');

            this.content.setStyle('max-height', '0');
            this._expanded = false;
        },

        expandBody: function () {
            this._icon.removeModifier('rightArrow');
            this._icon.removeModifier('disabled');
            this._icon.setModifier('downArrow', '10px');
            this.button.setAttribute('title', 'Collapse');

            this.content.setStyle('max-height', this.contentHeight);
            this.content.setStyle('height', '100%');
            this._expanded = true;
        }

    }, {
        'EL_HEADER': 'eaSonOptManager-wSonOmAccordion-header',
        'EL_TITLE': 'eaSonOptManager-wSonOmAccordion-title',
        'EL_BUTTON': 'eaSonOptManager-wSonOmAccordion-button',
        'EL_ICON': 'ebIcon',
        'EL_BODY': 'eaSonOptManager-wSonOmAccordion-body'
    });

    return AccordionView;

});