define([
    'jscore/core',
    './sonoptmanagerView',
    './sonoptmanagerModel',
    './regions/frameHead/FrameHead',
    './regions/Schedule/Schedule',
    './regions/CreateSchedule/CreateSchedule',
    './regions/SystemConfig/SystemConfig',
    'widgets/Dialog',
    'jscore/ext/locationController',
    '../global'
], function (core, View, Model, FrameHead, Schedule, CreateSchedule, SystemConfig,  Dialog, LocationController, global) {

    var lc = new LocationController();
    var lastAppliedRegion=null;
    var lastHash=null;

    var systemConfigRegion;
    var scheduleRegion;
    var createScheduleRegion;

    var isCreateScheduleComplete = false;



    return core.App.extend({

        View: View,

        init: function () {
            this.options = global.options;
            this.model = new Model(this.modelOptions);
        },

        showAreYouSureLeavingPage: function(hash, pageName) {
            var defaultDialog = new Dialog({
                header: 'Leave this page?',
                content: "The  "+ pageName +" definition is incomplete. ",
                optionalContent: 'Your changes will be lost if you leave this page.',
                type: 'warning',
                buttons:[{caption: 'Stay on this page', color: 'darkBlue', action: function () {
                    defaultDialog.hide();
                    lc.start();
                }
                },
                    {caption: 'Leave this page', action: function () {
                        lc.setLocation(hash,true);
                        lc.start();
                        lastHash = hash;
                        defaultDialog.hide();
                        this.startRegion(hash);
                    }.bind(this)
                    }
                ],
                visible: true
            });
            defaultDialog.show();
        },

        startRegion : function (hash){



            this.getContext().eventBus.subscribe("sentServerCallToCreateSchedule", function(callSent) {

                this.isCreateScheduleComplete = callSent;
            }.bind(this));





            if(lastAppliedRegion !==null && lastAppliedRegion!==undefined) {
                lastAppliedRegion.stop();
            }
            this.getContext().eventBus.publish("url", hash);

            switch(hash){
                case 'sonoptmanager/systemConfig':
                    lastAppliedRegion = systemConfigRegion;
                    break;

                case 'sonoptmanager/schedules':
                    lastAppliedRegion = scheduleRegion;
                    break;

                case 'sonoptmanager/createSchedule':
                    lastAppliedRegion = createScheduleRegion;
                    break;
                default: lastAppliedRegion = null;
            }

            if(lastAppliedRegion !==null && lastAppliedRegion!==undefined)
                lastAppliedRegion.start(this.view.getAdminSection());
        },

        onStart : function () {

            systemConfigRegion = new SystemConfig({context: this.getContext(), options: this.options});

            scheduleRegion =  new Schedule({context: this.getContext(), options: this.options});
            createScheduleRegion = new CreateSchedule({context: this.getContext(), options: this.options});

            frameHeadRegion = new FrameHead({context: this.getContext(), options: this.options});
            frameHeadRegion.start(this.view.getFrameHeadder());

            lc.addLocationListener(function(hash) {
                if(lastHash==='sonoptmanager/createSchedule' && !this.isCreateScheduleComplete){
                    lc.setLocation(lastHash,true);

                    //stop location listener momentarily until the decision is made by the user
                    lc.stop();
                    this.showAreYouSureLeavingPage(hash, "create schedule");
                } else {
                    this.startRegion(hash);
                    lastHash = hash;
                }

            }.bind(this),this.getContext());

            lc.start();


        }
    });
});