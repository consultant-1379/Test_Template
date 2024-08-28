define([
require
],function(){
//You have to load all the extension ui here
//	require(['extensions/ossrc/main']);
	return {
		namespace: "sonoptmanager",
		appName: "sonoptmanager",
		modelOptions: {
			
			existingSchedulesURL: '/oss/undefined',
			scheduleBaseURL	: '/oss/sonom/rest/scheduler/create',
            isAliveURL : '/oss/sonom/rest/isalive',
            startSASFunctionURL :  '/oss/sonom/rest/sas/start'
            
		}
	};
});