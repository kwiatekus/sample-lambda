module.exports = {
    main: async function (event, context) {
      let waitTime = between(100, 3000); 
      console.log(`Will wait ${waitTime}`);
      let promise = new Promise((resolve, reject) => {
        setTimeout(() => {
            var payload = {
                ...event.data,
                waitTime
            };
            if(process.env['PUSH_EVENT_TYPE']){
                var eventOut=event.buildResponseCloudEvent(payload.uuid,process.env['PUSH_EVENT_TYPE'],payload);
                event.publishCloudEvent(eventOut);
                console.log(`Payload [${payload.uuid}] pushed to ${process.env['PUSH_EVENT_TYPE']}`,payload)
            }
            resolve(payload);
        }, waitTime)
      })
      
      return await promise;
    },
  };
  
  
  
  function between(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
  }
  