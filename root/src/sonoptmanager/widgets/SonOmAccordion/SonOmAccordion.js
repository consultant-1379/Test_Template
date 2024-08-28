define([
    'jscore/core',
    './SonOmAccordionView'
], function (core, View) {
    
    return core.Widget.extend({

        View: View,

        onViewReady: function () {
            this.setTheContentOfTheInfoPopupInAccordionHeader();
            this.view.initialise();
            
            this.view.afterRender();

            this.view.getHeaderNumber().setText(this.options.number);
            this.view.getHeaderTitle().setText(this.options.title);

            this.setContent(this.options.content);

            if(this.options.expanded === true){
                this.enabled = true;
                this.view.expandBody();
            }

            if (this.options.enabled === false) {
                this.enabled = false;
                this.disable();
            }
            
            this.postSaveFinish = this.options.postSaveFinish;
            if (!this.postSaveFinish) {
                this.view._icon.setModifier('disabled');
                this.view.getHeader().setStyle('pointer-events','none');
            }
        },

        setTitle: function (title) {
            if (typeof(title) === 'string' || title instanceof String) {
                this.view.getTitle().setText(title);
            } else if (title instanceof core.Widget) {
                title.attachTo(this.view.getTitle());
            } else {
                throw new Error('Title for Accordion should be core.Widget or String!');
            }
        },

        setContent: function (content) {
            if (content) {
                this.enable();

                var contentEl = this.view.getContent();
                contentEl.children().forEach(function (child) {
                    child.detach();
                });

                if (typeof(content) === 'string' || content instanceof String) {
                    var element = new core.Element();
                    element.setText(content);
                    contentEl.append(element);
                } else if (content instanceof core.Widget) {
                    content.attachTo(contentEl);
                } else {
                    throw new Error('Content for Accordion should be core.Widget or String!');
                }
            } else {
                this.disable();
            }
        },
        
        setPostSaveFinish : function () {
            this.postSaveFinish = true;
            this.view.setEvents();
            this.view._icon.removeModifier('disabled');
            this.view.getHeader().setStyle('pointer-events','auto');
        },

        enable: function () {
            this.enabled = true;
            this.getElement().removeModifier('disabled');
            this.view.getHeader().setStyle('background-color', '#66cbe5');
            this.view.getButton().setAttribute('title', 'Collapse');
            if (!this.postSaveFinish) {
                this.view._icon.setModifier('disabled');
                this.view.getHeader().setStyle('pointer-events','none');
            }
        },

        disable: function () {
            this.enabled = false;
            this.getElement().setModifier('disabled');
            this.view._icon.setModifier('disabled');
            this.view.getHeader().setStyle('background-color', '#ebebeb');
            this.view.foldBody();
            this.view.getButton().setAttribute('title', 'Disabled');
        },
        
        expandAccordion: function () {
            this.view.expandBody();
        },
        
        foldAccordion: function () {
            this.view.foldBody();
        },
        
        setAccordionHeaderColour: function (hexValue) {
            this.view.getHeader().setStyle('background-color', hexValue);
        },
        
        removeEvents: function () {
            this.view.removeEvents();
        },
        
        scrollAccordion: function () {
            this.view.getHeader()._getHTMLElement().scrollIntoView(true);
        },

        setTheContentOfTheInfoPopupInAccordionHeader: function () {
            this.view.setInfoPopupContent(this.options.infoText);
        },

        isEnabled: function(){
            return this.enabled;
        }
    });

});